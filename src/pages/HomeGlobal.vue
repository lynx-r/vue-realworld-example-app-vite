<template>
  <div class="home-global">
    <ArticleList type="all"/>
  </div>
</template>

<script lang="ts">

import ArticleList from 'components/ArticleList.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'HomeGlobal',
  components: {
    ArticleList
  }
})
</script>

<style scoped>

</style>
