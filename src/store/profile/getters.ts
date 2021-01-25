import { GetterTree } from 'vuex'
import { User } from '~/components/models'
import { StateInterface } from '..'
import { ProfileStateInterface } from './state'

type Getters = {
  profile(state: ProfileStateInterface): User
}

export type ProfileGetters = {
  [K in keyof Getters as `profile/${K extends symbol ? never : K}`]: ReturnType<Getters[K]>
}

const getters: GetterTree<ProfileStateInterface, StateInterface> & Getters = {
  profile(state) {
    return state.profile;
  }
}

export default getters
