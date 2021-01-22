import { ActionTree } from 'vuex'
import { StateInterface } from '..'
import { <%= name.pascalCase %>StateInterface } from './state'

const actions: ActionTree<<%= name.pascalCase %>StateInterface, StateInterface> = {
  someAction (/* context */) {
    // your code
  }
}

export default actions
