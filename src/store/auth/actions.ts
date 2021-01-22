import { ActionContext, ActionTree } from 'vuex'
import ApiService from '~/common/api.service'
import JwtService from '~/common/jwt.service'
import { User } from '~/components/models'
import { CHECK_AUTH, LOGIN, LOGOUT, REGISTER, UPDATE_USER } from '~/store/actions.type'
import { PURGE_AUTH, SET_AUTH, SET_ERROR } from '~/store/mutations.type'
import { StateInterface } from '..'
import { AuthMutations } from './mutations'
import { AuthStateInterface } from './state'

type AugmentedActionContext = {
  commit<K extends keyof AuthMutations>(
    key: K,
    payload?: Parameters<AuthMutations[K]>[1]
  ): ReturnType<AuthMutations[K]>
} & Omit<ActionContext<AuthStateInterface, StateInterface>, 'commit'>

export interface AuthActions {
  [LOGIN]({commit}: AugmentedActionContext, payload: User): Promise<User>

  [LOGOUT]({commit}: AugmentedActionContext): void

  [REGISTER]({commit}: AugmentedActionContext, payload: User): Promise<User>

  [CHECK_AUTH]({commit}: AugmentedActionContext): void

  [UPDATE_USER]({commit}: AugmentedActionContext, payload: User): Promise<User>
}

const actions: ActionTree<AuthStateInterface, StateInterface> & AuthActions = {
  [LOGIN]({commit}, credentials) {
    return new Promise(resolve => {
      ApiService.post('users/login', {user: credentials})
        .then(({data}) => {
          commit(SET_AUTH, data.user)
          resolve(data)
        })
        .catch(({response}) => {
          commit(SET_ERROR, response.data.errors)
        })
    })
  },
  [LOGOUT]({commit}) {
    commit(PURGE_AUTH)
  },
  [REGISTER]({commit}, credentials) {
    return new Promise((resolve, reject) => {
      ApiService.post('users', {user: credentials})
        .then(({data}) => {
          commit(SET_AUTH, data.user)
          resolve(data)
        })
        .catch(({response}) => {
          commit(SET_ERROR, response.data.errors)
          reject(response)
        })
    })
  },
  [CHECK_AUTH](context) {
    if (JwtService.getToken()) {
      ApiService.setHeader()
      ApiService.get('user')
        .then(({data}) => {
          context.commit(SET_AUTH, data.user)
        })
        .catch(({response}) => {
          context.commit(SET_ERROR, response.data.errors)
        })
    } else {
      context.commit(PURGE_AUTH)
    }
  },
  [UPDATE_USER]({commit}, payload) {
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
      commit(SET_AUTH, data.user)
      return data
    })
  }
}

export default actions
