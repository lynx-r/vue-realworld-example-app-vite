<template>
  <div class="home-global">
    <ArticleList type="all"/>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue'
import ArticleList from '~/components/ArticleList.vue'

export default defineComponent({
  name: 'HomeGlobal',
  components: {
    ArticleList
  }
})
</script>

<style scoped>

</style>
