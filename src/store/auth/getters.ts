import { GetterTree } from 'vuex'
import { User } from '~/components/models'
import { StateInterface } from '..'
import { AuthStateInterface } from './state'

type Getters = {
  currentUser(state: AuthStateInterface): User
  isAuthenticated(state: AuthStateInterface): boolean
}

export type AuthGetters = {
  [K in keyof Getters as `auth/${K extends symbol ? never : K}`]: ReturnType<Getters[K]>
}

const getters: GetterTree<AuthStateInterface, StateInterface> & Getters = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
}

export default getters
