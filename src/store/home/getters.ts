import { GetterTree } from 'vuex'
import { Article, Tag } from '~/components/models'
import { StateInterface } from '~/store'
import { HomeStateInterface } from './state'

export type HomeGetters = {
  articlesCount(state: HomeStateInterface): number
  articles(state: HomeStateInterface): Article[]
  isLoading(state: HomeStateInterface): boolean
  tags(state: HomeStateInterface): Tag
}

const getters: GetterTree<HomeStateInterface, StateInterface> & HomeGetters = {
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
