import { GetterTree } from 'vuex'
import { StateInterface } from '~/store'
import { HomeStateInterface } from './state'

const getters: GetterTree<HomeStateInterface, StateInterface> = {
  articlesCount (state) {
    return state.articlesCount
  },
  articles (state) {
    return state.articles
  },
  isLoading (state) {
    return state.isLoading
  },
  tags (state) {
    return state.tags
  }
}

export default getters
