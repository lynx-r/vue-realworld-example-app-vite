import { Module } from 'vuex'
import { StateInterface } from '~/store'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state, { HomeStateInterface } from './state'

const homeModule: Module<HomeStateInterface, StateInterface>  = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default homeModule;
