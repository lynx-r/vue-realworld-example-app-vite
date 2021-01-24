import { MutationTree } from 'vuex'
import { Article, Tag } from '~/components/models'
import { HomeMutationTypes } from '~/store/home/home-mutation-types'
import { HomeStateInterface } from './state'

export type HomeMutations<S = HomeStateInterface> = {
  [HomeMutationTypes.FETCH_START](state: S): void
  [HomeMutationTypes.FETCH_END](state: S, payload: {articles: Article[], articlesCount: number}): void
  [HomeMutationTypes.SET_TAGS](state: S, tags: Tag[]): void
  [HomeMutationTypes.UPDATE_ARTICLE_IN_LIST](state: S, data: Article): void
}

const mutation: MutationTree<HomeStateInterface> & HomeMutations = {
  [HomeMutationTypes.FETCH_START](state) {
    state.isLoading = true;
  },
  [HomeMutationTypes.FETCH_END](state, { articles, articlesCount }) {
    state.articles = articles;
    state.articlesCount = articlesCount;
    state.isLoading = false;
  },
  [HomeMutationTypes.SET_TAGS](state, tags) {
    state.tags = tags;
  },
  [HomeMutationTypes.UPDATE_ARTICLE_IN_LIST](state, data) {
    state.articles = state.articles.map(article => {
      if (article.slug !== data.slug) {
        return article;
      }
      // We could just return data, but it seems dangerous to
      // mix the results of different api calls, so we
      // protect ourselves by copying the information.
      article.favorited = data.favorited;
      article.favoritesCount = data.favoritesCount;
      return article;
    });
  }
};

export default mutation;
