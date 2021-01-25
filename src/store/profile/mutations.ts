import { MutationTree } from 'vuex'
import { User } from '~/components/models'
import { ProfileMutationTypes } from './profile-mutation-types'
import { ProfileStateInterface } from './state'

export type ProfileMutations<S = ProfileStateInterface> = {
  [ProfileMutationTypes.SET_PROFILE](state: S, payload: User): void
}

const mutation: MutationTree<ProfileStateInterface> & ProfileMutations = {
  [ProfileMutationTypes.SET_PROFILE](state, profile) {
    state.profile = profile;
    state.errors = {};
  }
}

export default mutation
