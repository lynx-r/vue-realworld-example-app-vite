<template>
  <div class="home-tag">
    <ArticleList :tag="tag"></ArticleList>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import ArticleList from '~/components/ArticleList'

export default defineComponent({
  name: 'HomeTag',
  components: {
    ArticleList
  },
  setup() {
    const route = useRoute()
    const tag = computed(() => route.params.tag)
    return {tag}
  }
})
</script>
