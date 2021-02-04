import { StateWithModuleName } from '~/store/models'

export interface ExampleStateInterface extends StateWithModuleName {
  prop: boolean;
}

const state: ExampleStateInterface = {
  moduleName: 'example',
  prop: false
}

export default state
