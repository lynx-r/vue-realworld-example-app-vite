import { ActionContext, ActionTree } from 'vuex'
import { ArticlesService, TagsService } from '~/common/api.service'
import { Article, ListConfig } from '~/components/models'
import { StateInterface } from '~/store'
import { HomeActionTypes } from '~/store/home/home-action-types'
import { HomeMutationTypes } from '~/store/home/home-mutation-types'
import { HomeMutations } from './mutations'
import { HomeStateInterface } from './state'

type AugmentedActionContext = {
  commit<K extends keyof HomeMutations>(
    key: K,
    payload?: Parameters<HomeMutations[K]>[1]
  ): ReturnType<HomeMutations[K]>
} & Omit<ActionContext<HomeStateInterface, StateInterface>, 'commit'>

export interface HomeActions {
  [HomeActionTypes.FETCH_ARTICLES](context: AugmentedActionContext, payload: ListConfig): Promise<void>

  [HomeActionTypes.FETCH_TAGS](context: AugmentedActionContext): Promise<void>

  [HomeActionTypes.UPDATE_ARTICLE_IN_LIST](context: AugmentedActionContext, payload: Article): void
}

const actions: ActionTree<HomeStateInterface, StateInterface> & HomeActions = {
  [HomeActionTypes.FETCH_ARTICLES]({commit}, params) {
    commit(HomeMutationTypes.FETCH_START)
    return ArticlesService.query(params.type, params.filter)
      .then(({data}) => {
        commit(HomeMutationTypes.FETCH_END, data)
      })
      .catch((error: any) => {
        throw new Error(error)
      })
  },
  [HomeActionTypes.FETCH_TAGS]({commit}) {
    return TagsService.get()
      .then(({data}) => {
        commit(HomeMutationTypes.SET_TAGS, data.tags)
      })
      .catch((error: any) => {
        throw new Error(error)
      })
  },
  [HomeActionTypes.UPDATE_ARTICLE_IN_LIST]({state}, data) {
    state.articles = state.articles.map(article => {
      if (article.slug !== data.slug) {
        return article
      }
      // We could just return data, but it seems dangerous to
      // mix the results of different api calls, so we
      // protect ourselves by copying the information.
      article.favorited = data.favorited
      article.favoritesCount = data.favoritesCount
      return article
    })
  }
}

export default actions
