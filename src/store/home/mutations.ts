import { Article, Tag } from '~/components/models'
import TagList from '~/components/TagList.vue'
import { FETCH_END, FETCH_START, SET_TAGS, UPDATE_ARTICLE_IN_LIST } from '~/store/mutations.type'
import { MutationTree } from 'vuex';
import { HomeStateInterface } from './state';

export type HomeMutations<S = HomeStateInterface> = {
  [FETCH_START](state: S): void
  [FETCH_END](state: S, payload: {articles: Article[], articlesCount: number}): void
  [SET_TAGS](state: S, tags: Tag): void
  [UPDATE_ARTICLE_IN_LIST](state: S, data: Article): void
}

const mutation: MutationTree<HomeStateInterface> & HomeMutations = {
  [FETCH_START](state) {
    state.isLoading = true;
  },
  [FETCH_END](state, { articles, articlesCount }) {
    state.articles = articles;
    state.articlesCount = articlesCount;
    state.isLoading = false;
  },
  [SET_TAGS](state, tags) {
    state.tags = tags;
  },
  [UPDATE_ARTICLE_IN_LIST](state, data) {
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
