import { Module } from 'vuex'
import { StateInterface } from '..'
import state, { <%= name.pascalCase %>StateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const <%= name.pascalCase %>Module: Module<<%= name.pascalCase %>StateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
}

export default <%= name.pascalCase %>Module
