import { ActionContext, ActionTree } from 'vuex'
import { ArticlesService, TagsService } from '~/common/api.service'
import { ListConfig } from '~/components/models'
import { StateInterface } from '~/store'
import { FETCH_ARTICLES, FETCH_TAGS } from '~/store/actions.type'
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
  [FETCH_ARTICLES]({commit}: AugmentedActionContext, payload: ListConfig): Promise<void>

  [FETCH_TAGS]({commit}: AugmentedActionContext): Promise<void>
}

const actions: ActionTree<HomeStateInterface, StateInterface> & HomeActions = {
  [FETCH_ARTICLES]({commit}, params) {
    commit(FETCH_START)
    return ArticlesService.query(params.type, params.filter)
      .then(({data}) => {
        commit(FETCH_END, data)
      })
      .catch((error: any) => {
        throw new Error(error)
      })
  },
  [FETCH_TAGS]({commit}) {
    return TagsService.get()
      .then(({data}) => {
        commit(SET_TAGS, data.tags)
      })
      .catch((error: any) => {
        throw new Error(error)
      })
  }
}

export default actions
