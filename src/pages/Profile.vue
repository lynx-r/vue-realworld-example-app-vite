<template>
  <div class="profile-page">
    <div class="user-info">
      <div class="container">
        <div class="row">
          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="profile.image" class="user-img" />
            <h4>{{ profile.username }}</h4>
            <p>{{ profile.bio }}</p>
            <div v-if="isCurrentUser()">
              <router-link
                  class="btn btn-sm btn-outline-secondary action-btn"
                  :to="{ name: 'settings' }"
              >
                <i class="ion-gear-a"></i> Edit Profile Settings
              </router-link>
            </div>
            <div v-else>
              <button
                  class="btn btn-sm btn-secondary action-btn"
                  v-if="profile.following"
                  @click.prevent="unfollow()"
              >
                <i class="ion-plus-round"></i> &nbsp;Unfollow
                {{ profile.username }}
              </button>
              <button
                  class="btn btn-sm btn-outline-secondary action-btn"
                  v-if="!profile.following"
                  @click.prevent="follow()"
              >
                <i class="ion-plus-round"></i> &nbsp;Follow
                {{ profile.username }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">
        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <router-link
                    class="nav-link"
                    active-class="active"
                    :to="{ name: 'profile' }"
                >
                  My Articles
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                    class="nav-link"
                    active-class="active"
                    :to="{ name: 'profile-favorites' }"
                >
                  Favorited Articles
                </router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from '~/store'
import { ProfileActionTypes } from '~/store/profile/profile-action-types'

export default defineComponent({
  name: 'Profile',
  components: {},
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    onMounted(() => store.dispatch(ProfileActionTypes.FETCH_PROFILE, route.params))

    const currentUser = computed(() => store.getters['auth/currentUser'])
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
    const profile = computed(() => store.getters['profile/profile'])

    const isCurrentUser = () => {
      if (currentUser.value.username && profile.value.username) {
        return currentUser.value.username === profile.value.username;
      }
      return false;
    }

    const follow = () => {
      if (!isAuthenticated.value) return;
      store.dispatch(ProfileActionTypes.FETCH_PROFILE_FOLLOW, route.params);
    }

    const unfollow = () => {
      store.dispatch(ProfileActionTypes.FETCH_PROFILE_UNFOLLOW, route.params);
    }

    watch(() => route.params, (params) => {
      store.dispatch(ProfileActionTypes.FETCH_PROFILE, params)
    })

    return {currentUser, isAuthenticated, profile, isCurrentUser, follow, unfollow}
  },
});
</script>
