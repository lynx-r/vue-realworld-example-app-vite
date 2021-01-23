<template>
  <div class="home-page">
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
    <div class="container page">
      <div class="row">
        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="isAuthenticated" class="nav-item">
                <router-link
                    :to="{ name: 'home-my-feed' }"
                    class="nav-link"
                    active-class="active"
                >
                  Your Feed
                </router-link>
              </li>
              <li class="nav-item">
                <router-link
                    :to="{ name: 'home' }"
                    class="nav-link"
                    active-class="active"
                >
                  Global Feed
                </router-link>
              </li>
              <li class="nav-item" v-if="tag">
                <router-link
                    :to="{ name: 'home-tag', params: { tag } }"
                    class="nav-link"
                    active-class="active"
                >
                  <i class="ion-pound"></i> {{ tag }}
                </router-link>
              </li>
            </ul>
          </div>
          <router-view></router-view>
        </div>
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tag</p>
            <div class="tag-list">
              <VTag v-for="(tag, index) in tags" :name="tag" :key="index">
              </VTag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from '~/store';
import VTag from '~/components/VTag.vue';
import { FETCH_TAGS } from '~/store/actions.type';

export default defineComponent({
  name: 'Home',
  components: {
    VTag
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    onMounted(() => {
      store.dispatch(FETCH_TAGS);
    });
    const tag = computed(() => route.params.tag);
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);
    const tags = computed(() => store.getters.tags);

    return {tag, tags, isAuthenticated};
  },
});
</script>
