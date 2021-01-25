import { GetterTree } from 'vuex'
import { StateInterface } from '..'
import { ArticleStateInterface } from './state'

type Getters = {
  someAction(state: ArticleStateInterface): boolean
}

export type ArticleGetters = {
  [K in keyof Getters as `article/${K extends symbol ? never : K}`]: ReturnType<Getters[K]>
}

const getters: GetterTree<ArticleStateInterface, StateInterface> & Getters = {
  someAction(state) {
    return state.prop
    // your code
  }
}

export default getters
