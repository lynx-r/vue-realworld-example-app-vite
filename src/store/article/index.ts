import { Module } from 'vuex'
import { StateInterface } from '../models'
import actions from './actions'
import { ArticleActionTypes } from './article-action-types'
import getters from './getters'
import mutations from './mutations'
import state, { ArticleStateInterface } from './state'

type ActionTypes = { actionTypes: typeof ArticleActionTypes }

const article: Module<ArticleStateInterface, StateInterface> & ActionTypes = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
  actionTypes: ArticleActionTypes
}

export default article
