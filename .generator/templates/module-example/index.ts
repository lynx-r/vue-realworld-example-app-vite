import { Module } from 'vuex'
import { StateInterface } from '..'
import actions from './actions'
import { <%= name.pascalCase %>ActionTypes } from './<%= name.kebabCase %>-action-types'
import getters from './getters'
import mutations from './mutations'
import state, { <%= name.pascalCase %>StateInterface } from './state'

type ActionTypes = { actionTypes: typeof <%= name.pascalCase %>ActionTypes }

const <%= name.camelCase %>: Module<<%= name.pascalCase %>StateInterface, StateInterface> & ActionTypes = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
  actionTypes: <%= name.pascalCase %>ActionTypes
}

export default <%= name.camelCase %>
