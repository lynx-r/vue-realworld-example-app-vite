import { MutationTree } from 'vuex'
import { Article, Comment } from '~/components/models'
import { ArticleMutationTypes } from './article-mutation-types'
import { ArticleStateInterface } from './state'

export type ArticleMutations<S = ArticleStateInterface> = {
  [ArticleMutationTypes.FETCH_START](state: S): void
  [ArticleMutationTypes.SET_ARTICLE](state: S, payload: Article): void
  [ArticleMutationTypes.SET_COMMENTS](state: S, payload: Comment[]): void
  [ArticleMutationTypes.TAG_ADD](state: S, payload: string): void
  [ArticleMutationTypes.TAG_REMOVE](state: S, payload: string): void
  [ArticleMutationTypes.RESET_STATE](): void
}

const mutation: MutationTree<ArticleStateInterface> & ArticleMutations = {
  [ArticleMutationTypes.FETCH_START](state) {
    state.isLoading = true
  },
  [ArticleMutationTypes.SET_ARTICLE](state, article) {
    state.article = article
    state.isLoading = false
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
  [ArticleMutationTypes.RESET_STATE]() {
    // todo
    // for (let f in state) {
    //   Vue.set(state, f, initialState[f]);
    // }
  }
}

export default mutation
