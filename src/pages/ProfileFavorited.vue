<template>
  <div class="profile-page">
    <ArticleList :favorited="favorited" :items-per-page="5">
    </ArticleList>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import ArticleList from '~/components/ArticleList.vue'

export default defineComponent({
  name: 'ProfileFavorited',
  components: {
    ArticleList
  },
  setup() {
    const route = useRoute()
    const favorited = computed(() => route.params.username)
    return {favorited}
  },
});
</script>
