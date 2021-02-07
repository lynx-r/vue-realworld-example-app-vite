import { Module } from 'vuex'
import { StateInterface } from '../models'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state, { ProfileStateInterface } from './state'


const profile: Module<ProfileStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
}

export default profile
