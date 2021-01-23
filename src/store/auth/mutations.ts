import { MutationTree } from 'vuex'
import JwtService from '~/common/jwt.service'
import { Errors, User } from '~/components/models'
import { AuthMutationTypes } from '~/store/auth/auth-mutation-types'
import { AuthStateInterface } from './state'

export type AuthMutations<S = AuthStateInterface> = {
  [AuthMutationTypes.SET_ERROR](state: S, error: Errors): void
  [AuthMutationTypes.SET_AUTH](state: S, user: User): void
  [AuthMutationTypes.PURGE_AUTH](state: S): void
}

const mutation: MutationTree<AuthStateInterface> & AuthMutations = {
  [AuthMutationTypes.SET_ERROR](state, error) {
    state.errors = error
  },
  [AuthMutationTypes.SET_AUTH](state, user) {
    state.isAuthenticated = true
    state.user = user
    state.errors = {}
    JwtService.saveToken(state.user.token)
  },
  [AuthMutationTypes.PURGE_AUTH](state) {
    state.isAuthenticated = false
    state.user = {}
    state.errors = {}
    JwtService.destroyToken()
  }
}

export default mutation
