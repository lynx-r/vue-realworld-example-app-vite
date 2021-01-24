import { Module } from 'vuex'
import { StateInterface } from '..'
import actions from './actions'
import { ExampleActionTypes } from './example-action-types'
import getters from './getters'
import mutations from './mutations'
import state, { ExampleStateInterface } from './state'

type ActionTypes = { actionTypes: typeof ExampleActionTypes }

const exampleModule: Module<ExampleStateInterface, StateInterface> & ActionTypes = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
  actionTypes: ExampleActionTypes
}

export default exampleModule
