import { Module } from 'vuex';
import { StateInterface } from '~/store';
import state, { HomeStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const exampleModule: Module<HomeStateInterface, StateInterface> = {
  namespaced: false,
  actions,
  getters,
  mutations,
  state
};

export default exampleModule;
