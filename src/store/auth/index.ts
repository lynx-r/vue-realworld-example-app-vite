import { Module } from 'vuex'
import { StateInterface } from '..'
import state, { AuthStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const authModule: Module<AuthStateInterface, StateInterface> = {
  namespaced: false,
  actions,
  getters,
  mutations,
  state
}

export default authModule
