import { GetterTree } from 'vuex'
import { Article, Tag } from '~/components/models'
import { StateInterface } from '~/store'
import { HomeStateInterface } from './state'

type Getters = {
  articlesCount(state: HomeStateInterface): number
  articles(state: HomeStateInterface): Article[]
  isLoading(state: HomeStateInterface): boolean
  tags(state: HomeStateInterface): Tag[]
}

export type HomeGetters = {
  [K in keyof Getters as `home/${K extends symbol ? never : K}`]: ReturnType<Getters[K]>
}

const getters: GetterTree<HomeStateInterface, StateInterface> & Getters = {
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
