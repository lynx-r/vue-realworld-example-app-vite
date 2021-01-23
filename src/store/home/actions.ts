import { ActionContext, ActionTree } from 'vuex'
import { ArticlesService, TagsService } from '~/common/api.service'
import { ListConfig } from '~/components/models'
import { StateInterface } from '~/store'
import { HomeActionTypes } from '~/store/home/home-action-types'
import { HomeMutationTypes } from '~/store/home/home-mutation-types'
import { FETCH_END, FETCH_START, SET_TAGS } from '~/store/mutations.type'
import { HomeMutations } from './mutations'
import { HomeStateInterface } from './state'

type AugmentedActionContext = {
  commit<K extends keyof HomeMutations>(
    key: K,
    payload?: Parameters<HomeMutations[K]>[1]
  ): ReturnType<HomeMutations[K]>
} & Omit<ActionContext<HomeStateInterface, StateInterface>, 'commit'>

export interface HomeActions {
  [HomeActionTypes.FETCH_ARTICLES]({commit}: AugmentedActionContext, payload: ListConfig): Promise<void>

  [HomeActionTypes.FETCH_TAGS]({commit}: AugmentedActionContext): Promise<void>
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
  }
}

export default actions
