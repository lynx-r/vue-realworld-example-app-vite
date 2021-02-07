<template>
  <div class="home-tag">
    <ArticleList :tag="tag"></ArticleList>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import ArticleList from '~/components/ArticleList.vue'

export default defineComponent({
  name: 'HomeTag',
  components: {
    ArticleList
  },
  setup() {
    const route = useRoute()
    const tag = ref(route.params.tag)
    watch(() => route.params, (params) => {
      tag.value = params.tag
    })
    return {tag}
  }
})
</script>
