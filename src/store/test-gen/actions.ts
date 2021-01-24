import { ActionContext, ActionTree } from 'vuex'
import { StateInterface } from '..'
import { TestGenActionTypes } from './test-gen-action-types'
import { TestGenMutationTypes } from './test-gen-mutation-types'
import { TestGenMutations } from './mutations'
import { TestGenStateInterface } from './state'

type AugmentedActionContext = {
  commit<K extends keyof TestGenMutations>(
    key: K,
    payload?: Parameters<TestGenMutations[K]>[1]
  ): ReturnType<TestGenMutations[K]>
} & Omit<ActionContext<TestGenStateInterface, StateInterface>, 'commit'>

export interface TestGenActions {
  [TestGenActionTypes.SOME_ACTION]({commit}: AugmentedActionContext, payload: boolean): Promise<void>
}

const actions: ActionTree<TestGenStateInterface, StateInterface> & TestGenActions = {
  [TestGenActionTypes.SOME_ACTION]({commit}, payload) {
    // your code
    commit(TestGenMutationTypes.SOME_MUTATION, payload)
    return Promise.resolve()
  }
}

export default actions
