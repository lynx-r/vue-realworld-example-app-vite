import { createStore } from 'vuex'
import article from './article'
import { ArticleStateInterface } from './article/state'
import auth from './auth'
import { AuthStateInterface } from './auth/state'
import home from './home'
import { HomeStateInterface } from './home/state'
import {
  Commit,
  Dispatch,
  DispatchReturnType,
  QualifiedKeyType,
  QualifierFor,
  StateWithModuleName,
  Store
} from './models'
import profile from './profile'
import { ProfileStateInterface } from './profile/state'

const modules = {home, auth, profile, article}

const store = createStore({
  modules
})

/**
 * wraps origin store.dispatch to add '[moduleName]/'
 */
const dispatchWrapped = store.dispatch

const dispatchWrapper: Dispatch = (key, payload, options) => {
  const type = qualifyKey('mutation', key)
  return dispatchWrapped(type, payload, options) as DispatchReturnType<typeof key>
}

store.dispatch = dispatchWrapper

// end newDispatch

/**
 * wraps origin store.dispatch to add '[moduleName]/'
 */
const commitWrapped = store.commit

const commitWrapper: Commit = (key, payload, options) => {
  const type = qualifyKey('action', key)
  commitWrapped(type, payload, options)
}

store.commit = commitWrapper

// end newCommit

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

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  home: HomeStateInterface,
  auth: AuthStateInterface,
  profile: ProfileStateInterface,
  article: ArticleStateInterface
}

export function useStore(): Store {
  return store
}
