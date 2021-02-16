import { ActionContext, ActionTree } from 'vuex'
import ApiService from '~/common/api.service'
import JwtService from '~/common/jwt.service'
import { Credentials, RegisterUser, User } from '~/components/models'
import { AuthActionTypes } from '~/store/auth/auth-action-types'
import { AuthMutationTypes } from '~/store/auth/auth-mutation-types'
import { StateInterface } from '../models'
import { AuthMutations } from './mutations'
import { AuthStateInterface } from './state'

type AugmentedActionContext = {
  commit<K extends keyof AuthMutations>(
    key: K,
    payload?: Parameters<AuthMutations[K]>[1]
  ): ReturnType<AuthMutations[K]>
} & Omit<ActionContext<AuthStateInterface, StateInterface>, 'commit'>

export interface AuthActions {
  [AuthActionTypes.LOGIN]({commit}: AugmentedActionContext, payload: Credentials): Promise<User>

  [AuthActionTypes.LOGOUT]({commit}: AugmentedActionContext): Promise<void>

  [AuthActionTypes.REGISTER]({commit}: AugmentedActionContext, payload: RegisterUser): Promise<User>

  [AuthActionTypes.CHECK_AUTH]({commit}: AugmentedActionContext): void

  [AuthActionTypes.UPDATE_USER]({commit}: AugmentedActionContext, payload: User): Promise<User>
}

const actions: ActionTree<AuthStateInterface, StateInterface> & AuthActions = {
  [AuthActionTypes.LOGIN]({commit}, credentials) {
    return new Promise(resolve => {
      ApiService.post('users/login', {user: credentials})
        .then(({data}) => {
          commit(AuthMutationTypes.SET_AUTH, data.user)
          resolve(data)
        })
        .catch(({response}) => {
          commit(AuthMutationTypes.SET_ERROR, response.data.errors)
        })
    })
  },
  [AuthActionTypes.LOGOUT]({commit}) {
    return new Promise((resolve => {
      commit(AuthMutationTypes.PURGE_AUTH)
      resolve()
    }))
  },
  [AuthActionTypes.REGISTER]({commit}, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post('users', {user: credentials})
        .then(({data}) => {
          commit(AuthMutationTypes.SET_AUTH, data.user)
          resolve(data)
        })
        .catch(({response}) => {
          commit(AuthMutationTypes.SET_ERROR, response.data.errors)
          reject(response)
        })
    })
  },
  [AuthActionTypes.CHECK_AUTH](context) {
    if (JwtService.getToken()) {
      ApiService.setHeader()
      ApiService.get('user')
        .then(({data}) => {
          context.commit(AuthMutationTypes.SET_AUTH, data.user)
        })
        .catch(({response}) => {
          context.commit(AuthMutationTypes.SET_ERROR, response.data.errors)
        })
    } else {
      context.commit(AuthMutationTypes.PURGE_AUTH)
    }
  },
  [AuthActionTypes.UPDATE_USER]({commit}, payload) {
    const {email, username, password, image, bio} = payload
    const user = {
      email,
      username,
      bio,
      image
    } as User
    if (password) {
      user.password = password
    }

    return ApiService.put('user', user).then(({data}) => {
      commit(AuthMutationTypes.SET_AUTH, data.user)
      return data
    })
  }
}

export default actions
