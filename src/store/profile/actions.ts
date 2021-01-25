import { ActionContext, ActionTree } from 'vuex'
import ApiService from '~/common/api.service'
import { User } from '~/components/models'
import { StateInterface } from '..'
import { ProfileActionTypes } from './profile-action-types'
import { ProfileMutationTypes } from './profile-mutation-types'
import { ProfileMutations } from './mutations'
import { ProfileStateInterface } from './state'

type AugmentedActionContext = {
  commit<K extends keyof ProfileMutations>(
    key: K,
    payload?: Parameters<ProfileMutations[K]>[1]
  ): ReturnType<ProfileMutations[K]>
} & Omit<ActionContext<ProfileStateInterface, StateInterface>, 'commit'>

export interface ProfileActions {
  [ProfileActionTypes.FETCH_PROFILE]({commit}: AugmentedActionContext, payload: User): Promise<User>
  [ProfileActionTypes.FETCH_PROFILE_FOLLOW]({commit}: AugmentedActionContext, payload: User): Promise<User>
  [ProfileActionTypes.FETCH_PROFILE_UNFOLLOW]({commit}: AugmentedActionContext, payload: User): Promise<User>
}

const actions: ActionTree<ProfileStateInterface, StateInterface> & ProfileActions = {
  [ProfileActionTypes.FETCH_PROFILE](context, payload) {
    const { username } = payload;
    return ApiService.get("profiles", username)
      .then(({ data }) => {
        context.commit(ProfileMutationTypes.SET_PROFILE, data.profile);
        return data;
      })
      .catch(() => {
        // #todo SET_ERROR cannot work in multiple states
        // context.commit(SET_ERROR, response.data.errors)
      });
  },
  [ProfileActionTypes.FETCH_PROFILE_FOLLOW](context, payload) {
    const { username } = payload;
    return ApiService.post(`profiles/${username}/follow`)
      .then(({ data }) => {
        context.commit(ProfileMutationTypes.SET_PROFILE, data.profile);
        return data;
      })
      .catch(() => {
        // #todo SET_ERROR cannot work in multiple states
        // context.commit(SET_ERROR, response.data.errors)
      });
  },
  [ProfileActionTypes.FETCH_PROFILE_UNFOLLOW](context, payload) {
    const { username } = payload;
    return ApiService.delete(`profiles/${username}/follow`)
      .then(({ data }) => {
        context.commit(ProfileMutationTypes.SET_PROFILE, data.profile);
        return data;
      })
      .catch(() => {
        // #todo SET_ERROR cannot work in multiple states
        // context.commit(SET_ERROR, response.data.errors)
      });
  }
}

export default actions
