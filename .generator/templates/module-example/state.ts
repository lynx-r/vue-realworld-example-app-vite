import { StateWithModuleName } from '~/store/models'

export interface <%= name.pascalCase %>StateInterface extends StateWithModuleName {
  prop: boolean
}

const state:  <%= name.pascalCase %>StateInterface = {
  moduleName: '<%= name.camelCase %>',
  prop: false
}

export default state
