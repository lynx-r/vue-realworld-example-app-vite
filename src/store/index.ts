import { CommitOptions, createStore, DispatchOptions, Store as VuexStore } from 'vuex'
import { AuthActions } from '~/store/auth/actions'
import { AuthGetters } from '~/store/auth/getters'
import { AuthMutations } from '~/store/auth/mutations'
import { HomeActions } from '~/store/home/actions'
import { HomeGetters } from '~/store/home/getters'
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
  modules: {
    home,
    auth,
  },
})

type Mutations = AuthMutations & HomeMutations
type Actions = AuthActions & HomeActions
type Getters = AuthGetters & HomeGetters

export type Store = Omit<VuexStore<StateInterface>,
  'getters' | 'commit' | 'dispatch'> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}

export function useStore() {
  return store as Store
}
