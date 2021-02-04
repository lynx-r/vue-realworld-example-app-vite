import { createStore } from 'vuex'
import article from './article'
import { ArticleStateInterface } from './article/state'
import auth from './auth'
import { AuthStateInterface } from './auth/state'
import home from './home'
import { HomeStateInterface } from './home/state'
import { Commit, Dispatch, QualifierFor, QualifiedKeyType, StateWithModuleName, Store } from './models'
import profile from './profile'
import { ProfileStateInterface } from './profile/state'

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
  profile: ProfileStateInterface,
  article: ArticleStateInterface
}

export const modules = {home, auth, profile, article}

export const store = createStore({
  modules
})

/**
 * override origin store.dispatch to add '[moduleName]/'
 */
const origDispatch = store.dispatch

const newDispatch: Dispatch = (key, payload, options) => {
  const qKey = qualifyKey('mutation', key)
  return origDispatch(qKey, payload, options)
}

store.dispatch = newDispatch

// end newDispatch

/**
 * override origin store.dispatch to add '[moduleName]/'
 */
const origCommit = store.commit

const newCommit: Commit = (key, payload, options) => {
  const qKey = qualifyKey('action', key)
  origCommit(qKey, payload, options)
}

store.commit = newCommit

// end newCommit

export function useStore(): Store {
  return store
}

// private
const qualifyKey = <T extends QualifierFor>(type: QualifierFor, key: QualifiedKeyType<T>) => {
  const module = Object
    .values(modules)
    .find((m) => {
      const keys = [...Object.keys(m.actions!), Object.keys(m.mutations!)]
      if (keys.includes(key)) {
        return m
      }
    })

  return !!module
    ? (module.state as StateWithModuleName).moduleName + '/' + key
    : key
}
