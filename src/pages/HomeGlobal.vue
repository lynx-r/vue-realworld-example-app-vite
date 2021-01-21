<template>
  <div class="home-global">
    <ArticleList type="all"/>
  </div>
</template>

<script lang="ts">

import ArticleList from 'components/ArticleList.vue'

export default {
  name: 'HomeGlobal',
  components: {
    ArticleList
  }
}
</script>

<style scoped>

</style>
