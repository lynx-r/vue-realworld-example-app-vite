import { Module } from 'vuex';
import { StateInterface } from '~/store';
import { HomeActionTypes } from '~/store/home/home-action-types'
import state, { HomeStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

type ActionTypes = {actionTypes: typeof HomeActionTypes}

const homeModule: Module<HomeStateInterface, StateInterface> & ActionTypes = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
  actionTypes: HomeActionTypes
};

export default homeModule;
