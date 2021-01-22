import { GetterTree } from 'vuex'
import { StateInterface } from '..'
import { <%= name.pascalCase %>StateInterface } from './state'

const getters: GetterTree<<%= name.pascalCase %>StateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
}

export default getters
