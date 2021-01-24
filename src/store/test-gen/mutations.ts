import { MutationTree } from 'vuex'
import { TestGenMutationTypes } from './test-gen-mutation-types'
import { TestGenStateInterface } from './state'

export type TestGenMutations<S = TestGenStateInterface> = {
  [TestGenMutationTypes.SOME_MUTATION](state: S, payload: boolean): void
}

const mutation: MutationTree<TestGenStateInterface> & TestGenMutations = {
  [TestGenMutationTypes.SOME_MUTATION](state, payload) {
    state.prop = payload
    // your code
  }
}

export default mutation
