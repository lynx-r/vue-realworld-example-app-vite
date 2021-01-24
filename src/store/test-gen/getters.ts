import { GetterTree } from 'vuex'
import { StateInterface } from '..'
import { TestGenStateInterface } from './state'

type Getters = {
  someAction(state: TestGenStateInterface): boolean
}

export type TestGenGetters = {
  [K in keyof Getters as `testGen/${K extends symbol ? never : K}`]: ReturnType<Getters[K]>
}

const getters: GetterTree<TestGenStateInterface, StateInterface> & Getters = {
  someAction(state) {
    return state.prop
    // your code
  }
}

export default getters
