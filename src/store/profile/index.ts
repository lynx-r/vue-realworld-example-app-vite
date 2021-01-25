import { Module } from 'vuex'
import { StateInterface } from '..'
import actions from './actions'
import { ProfileActionTypes } from './profile-action-types'
import getters from './getters'
import mutations from './mutations'
import state, { ProfileStateInterface } from './state'

type ActionTypes = { actionTypes: typeof ProfileActionTypes }

const profile: Module<ProfileStateInterface, StateInterface> & ActionTypes = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
  actionTypes: ProfileActionTypes
}

export default profile
