import { CommitOptions, createStore, DispatchOptions, Store as VuexStore } from 'vuex'
import { AuthActions } from '~/store/auth/actions'
import { AuthActionTypes } from '~/store/auth/auth-action-types'
import { AuthGetters } from '~/store/auth/getters'
import { AuthMutations } from '~/store/auth/mutations'
import { HomeActions } from '~/store/home/actions'
import { HomeGetters } from '~/store/home/getters'
import { HomeActionTypes } from '~/store/home/home-action-types'
import { HomeMutations } from '~/store/home/mutations'
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

export const store = createStore({
  devtools: true,
  modules: {
    home,
    auth,
  },
})

const origDispatch = store.dispatch

const newDispatch: Dispatch = (key, payload, options) => {
  let module
  if (key in HomeActionTypes) {
    module = 'home/'
  } else if (key in AuthActionTypes) {
    module = 'auth/'
  }
  const nsKey = module + key
  console.log(key, HomeActionTypes)
  return origDispatch(nsKey, payload, options)
}

store.dispatch = newDispatch

type Mutations = AuthMutations & HomeMutations

// type ModuleHomeActions = Omit<HomeActions, keyof HomeActions> & {
//   [K in keyof HomeActions as `home/${K extends symbol ? never : K}`]: HomeActions[K]
// }
//
// type ModuleAuthActions = Omit<AuthActions, keyof AuthActions> & {
//   [K in keyof AuthActions as `auth/${K extends symbol ? never : K}`]: AuthActions[K]
// }

type Actions = HomeActions & AuthActions

type ModuleHomeGetters = {
  [K in keyof HomeGetters as `home/${K extends symbol ? never : K}`]: ReturnType<HomeGetters[K]>
}
type ModuleAuthGetters = {
  [K in keyof AuthGetters as `auth/${K extends symbol ? never : K}`]: ReturnType<AuthGetters[K]>
}

type Commit = {
  <K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
}

type Dispatch = {
  <K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions,
  ): Promise<ReturnType<Actions[K]>>
}

type Getters = ModuleHomeGetters & ModuleAuthGetters

export type Store =
  Omit<VuexStore<StateInterface>, 'getters' | 'commit' | 'dispatch'>
  & { commit: Commit }
  & { dispatch: Dispatch }
  & { getters: Getters }

export function useStore() {
  console.log(store)
  return store as Store
}
