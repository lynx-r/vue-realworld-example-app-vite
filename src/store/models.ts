import { CommitOptions, DispatchOptions, Store as VuexStore } from 'vuex'
import { ArticleActions } from './article/actions'
import { ArticleGetters } from './article/getters'
import { ArticleMutations } from './article/mutations'
import { AuthActions } from './auth/actions'
import { AuthGetters } from './auth/getters'
import { AuthMutations } from './auth/mutations'
import { HomeActions } from './home/actions'
import { HomeGetters } from './home/getters'
import { HomeMutations } from './home/mutations'
import { StateInterface } from './index'
import { ProfileActions } from './profile/actions'
import { ProfileGetters } from './profile/getters'
import { ProfileMutations } from './profile/mutations'

type Mutations = AuthMutations & HomeMutations & ProfileMutations & ArticleMutations

type Actions = HomeActions & AuthActions & ProfileActions & ArticleActions

type Getters = HomeGetters & AuthGetters & ProfileGetters & ArticleGetters

// exported

export type Commit = {
  <K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): void
}

export type Dispatch = {
  <K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions,
  ): Promise<ReturnType<Actions[K]>>
}

export type Store =
  Omit<VuexStore<StateInterface>, 'getters' | 'commit' | 'dispatch'>
  & { commit: Commit }
  & { dispatch: Dispatch }
  & { getters: Getters }

export type QualifierFor = 'mutation' | 'action'

export type QualifiedKeyType<T> = T extends 'mutation' ? keyof Mutations : keyof Actions

export interface StateWithModuleName {
  readonly moduleName: string
}
