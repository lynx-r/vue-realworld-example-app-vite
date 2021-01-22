<template>
  <div class="home-tag">
    <ArticleList :tag="tag"></ArticleList>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArticleList from '~/components/ArticleList'

export default defineComponent({
  name: 'RwvHomeTag',
  components: {
    ArticleList
  },
  computed: {
    tag() {
      return this.$route.params.tag
    }
  }
})
</script>
