export interface <%= name.pascalCase %>StateInterface {
  prop: boolean
}

function state (): <%= name.pascalCase %>StateInterface {
  return {
    prop: false
  }
}

export default state
