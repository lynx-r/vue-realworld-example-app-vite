import { CommitOptions, createStore, DispatchOptions, Store as VuexStore } from 'vuex'
import { AuthActions } from '~/store/auth/actions'
import { AuthGetters } from '~/store/auth/getters'
import { AuthMutations } from '~/store/auth/mutations'
import { HomeActions } from '~/store/home/actions'
import { HomeGetters } from '~/store/home/getters'
import { HomeMutations } from '~/store/home/mutations'
import testGen from '~/store/test-gen'
import { TestGenActions } from '~/store/test-gen/actions'
import { TestGenGetters } from '~/store/test-gen/getters'
import { TestGenMutations } from '~/store/test-gen/mutations'
import auth from './auth'
import { AuthStateInterface } from './auth/state'
import home from './home'
import { HomeStateInterface } from './home/state'

// import example from './module-example';
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  home: HomeStateInterface,
  auth: AuthStateInterface,
}

const modules = {home, auth, testGen}

export const store = createStore({
  modules
})

/**
 * overrider origin store.dispatch to add 'module/'
 */
const origDispatch = store.dispatch

const newDispatch: Dispatch = (key, payload, options) => {
  const key_module = Object
    .entries(modules)
    .find(([k, v]) => key in v.actionTypes && k)
  let module = ''
  if (!!key_module && key_module[1].namespaced) {
    module = key_module[0] + '/'
  }
  console.log(module)
  const nsKey = module + key
  return origDispatch(nsKey, payload, options)
}

store.dispatch = newDispatch
// end newDispatch

/**
 * Must be augmented with every module **Mutations**
 */
type Mutations = AuthMutations & HomeMutations & TestGenMutations

type Commit = {
  <K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
}

/**
 * Must be augmented with every module **Actions**
 */
type Actions = HomeActions & AuthActions & TestGenActions

type Dispatch = {
  <K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions,
  ): Promise<ReturnType<Actions[K]>>
}

/**
 * Must be augmented with every module **Getters**
 */
type Getters = HomeGetters & AuthGetters & TestGenGetters

export type Store =
  Omit<VuexStore<StateInterface>, 'getters' | 'commit' | 'dispatch'>
  & { commit: Commit }
  & { dispatch: Dispatch }
  & { getters: Getters }

export function useStore() {
  return store as Store
}
