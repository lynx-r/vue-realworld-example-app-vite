<template>
  <div class="profile-page">
    <ArticleList :author="author" :items-per-page="5"></ArticleList>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import ArticleList from '~/components/ArticleList.vue'

export default defineComponent({
  name: 'ProfileArticles',
  components: {
    ArticleList
  },
  setup() {
    const route = useRoute()
    const author = computed(() => route.params.username)
    return {author}
  },
})
</script>
