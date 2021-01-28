import { GetterTree } from 'vuex'
import { Article, Comment } from '~/components/models'
import { StateInterface } from '..'
import { ArticleStateInterface } from './state'

type Getters = {
  article(state: ArticleStateInterface): Article
  comments(state: ArticleStateInterface): Comment[]
  isLoading(state: ArticleStateInterface): boolean
}

export type ArticleGetters = {
  [K in keyof Getters as `article/${K extends symbol ? never : K}`]: ReturnType<Getters[K]>
}

const getters: GetterTree<ArticleStateInterface, StateInterface> & Getters = {
  article(state) {
    console.log('??? get art', state.article)
    return state.article
  },
  comments(state) {
    return state.comments
  },
  isLoading(state: ArticleStateInterface): boolean {
    console.log('getter', state.isLoading)
    return state.isLoading
  }
}

export default getters
