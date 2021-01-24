import { GetterTree } from 'vuex'
import { StateInterface } from '..'
import { ExampleStateInterface } from './state'

type Getters = {
  someAction(state: ExampleStateInterface): number
}

export type ExampleGetters = {
  [K in keyof Getters as `example/${K extends symbol ? never : K}`]: ReturnType<Getters[K]>
}

const getters: GetterTree<ExampleStateInterface, StateInterface> & Getters = {
  someAction(state) {
    // your code
    return 0
  }
}

export default getters
