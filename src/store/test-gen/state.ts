export interface TestGenStateInterface {
  prop: boolean;
}

function state (): TestGenStateInterface {
  return {
    prop: false
  }
}

export default state
