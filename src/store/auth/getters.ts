import { GetterTree } from 'vuex'
import { StateInterface } from '..'
import { AuthStateInterface } from './state'

const getters: GetterTree<AuthStateInterface, StateInterface> = {
  currentUser(state) {
    return state.user;
  },
  isAuthenticated(state) {
    return state.isAuthenticated;
  }
}

export default getters
