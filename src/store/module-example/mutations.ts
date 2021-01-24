import { MutationTree } from 'vuex'
import { ExampleMutationTypes } from './example-mutation-types'
import { ExampleStateInterface } from './state'

export type ExampleMutations<S = ExampleStateInterface> = {
  [ExampleMutationTypes.SOME_MUTATION](state: S, payload: any): void
}

const mutation: MutationTree<ExampleStateInterface> & ExampleMutations = {
  [ExampleMutationTypes.SOME_MUTATION](state, payload) {
    // your code
  }
}

export default mutation
