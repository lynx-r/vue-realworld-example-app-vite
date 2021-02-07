import { Module } from 'vuex'
import { AuthActionTypes } from '~/store/auth/auth-action-types'
import { StateInterface } from '../models'
import state, { AuthStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

type ActionTypes = {actionTypes: typeof AuthActionTypes}

const authModule: Module<AuthStateInterface, StateInterface> & ActionTypes = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
  actionTypes: AuthActionTypes
}

export default authModule
