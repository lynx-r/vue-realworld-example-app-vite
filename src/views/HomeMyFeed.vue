<template>
  <div class="home-my-feed">
    <ArticleList type="feed"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ArticleList from '~/components/ArticleList.vue'

export default defineComponent({
  name: 'home-my-feed',
  components: {
    ArticleList
  }
})
</script>
