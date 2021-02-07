import { ActionContext, ActionTree } from 'vuex'
import { StateInterface } from '../models'
import { ExampleActionTypes } from './example-action-types'
import { ExampleMutationTypes } from './example-mutation-types'
import { ExampleMutations } from './mutations'
import { ExampleStateInterface } from './state'

type AugmentedActionContext = {
  commit<K extends keyof ExampleMutations>(
    key: K,
    payload?: Parameters<ExampleMutations[K]>[1]
  ): ReturnType<ExampleMutations[K]>
} & Omit<ActionContext<ExampleStateInterface, StateInterface>, 'commit'>

export interface ExampleActions {
  [ExampleActionTypes.SOME_ACTION]({commit}: AugmentedActionContext, payload: any): Promise<void>
}

const actions: ActionTree<ExampleStateInterface, StateInterface> & ExampleActions = {
  [ExampleActionTypes.SOME_ACTION]({commit}, payload) {
    // your code
    commit(ExampleMutationTypes.SOME_MUTATION, payload)
    return Promise.resolve()
  }
}

export default actions
