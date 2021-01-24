import { Module } from 'vuex'
import { StateInterface } from '..'
import actions from './actions'
import { TestGenActionTypes } from './test-gen-action-types'
import getters from './getters'
import mutations from './mutations'
import state, { TestGenStateInterface } from './state'

type ActionTypes = { actionTypes: typeof TestGenActionTypes }

const testGen: Module<TestGenStateInterface, StateInterface> & ActionTypes = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
  actionTypes: TestGenActionTypes
}

export default testGen
