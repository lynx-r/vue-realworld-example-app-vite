import { GetterTree } from 'vuex'
import { Article, Comment } from '~/components/models'
import { StateInterface } from '..'
import { ArticleStateInterface } from './state'

type Getters = {
  article(state: ArticleStateInterface): Article
  comments(state: ArticleStateInterface): Comment[]
}

export type ArticleGetters = {
  [K in keyof Getters as `article/${K extends symbol ? never : K}`]: ReturnType<Getters[K]>
}

const getters: GetterTree<ArticleStateInterface, StateInterface> & Getters = {
  article(state) {
    return state.article
  },
  comments(state) {
    return state.comments
  }
}

export default getters
