import * as _ from 'lodash'
import { MutationTree } from 'vuex'
import { Article, Comment } from '~/components/models'
import { ArticleMutationTypes } from './article-mutation-types'
import { ArticleStateInterface, initialState } from './state'

export type ArticleMutations<S = ArticleStateInterface> = {
  [ArticleMutationTypes.SET_ARTICLE](state: S, payload: Article): void
  [ArticleMutationTypes.SET_COMMENTS](state: S, payload: Comment[]): void
  [ArticleMutationTypes.TAG_ADD](state: S, payload: string): void
  [ArticleMutationTypes.TAG_REMOVE](state: S, payload: string): void
  [ArticleMutationTypes.RESET_STATE](state: S): void
}

const mutation: MutationTree<ArticleStateInterface> & ArticleMutations = {
  [ArticleMutationTypes.SET_ARTICLE](state, article) {
    state.article = article
  },
  [ArticleMutationTypes.SET_COMMENTS](state, comments) {
    state.comments = comments
  },
  [ArticleMutationTypes.TAG_ADD](state, tag) {
    state.article.tagList = state.article.tagList.concat([tag])
  },
  [ArticleMutationTypes.TAG_REMOVE](state, tag) {
    state.article.tagList = state.article.tagList.filter(t => t !== tag)
  },
  [ArticleMutationTypes.RESET_STATE](state) {
    Object.assign(state, _.cloneDeep({...initialState}))
  }
}

export default mutation
