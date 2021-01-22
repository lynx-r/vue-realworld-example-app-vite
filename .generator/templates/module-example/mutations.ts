import { MutationTree } from 'vuex'
import { <%= name.pascalCase %>StateInterface } from './state'

const mutation: MutationTree<<%= name.pascalCase %>StateInterface> = {
  someMutation (/* state: <%= name.pascalCase %>StateInterface */) {
    // your code
  }
}

export default mutation
