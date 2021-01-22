import { GetterTree } from 'vuex'
import { User } from '~/components/models'
import { StateInterface } from '..'
import { AuthStateInterface } from './state'

export type AuthGetters = {
  currentUser(state: AuthStateInterface): User
  isAuthenticated(state: AuthStateInterface): boolean
}

const getters: GetterTree<AuthStateInterface, StateInterface> & AuthGetters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
}

export default getters
