<template>
  <div class="home-my-feed"><RwvArticleList type="feed" /></div>
</template>

<script lang="ts">
import RwvArticleList from "~/components/ArticleList.vue";

export default {
  name: "rwv-home-my-feed",
  components: {
    RwvArticleList
  }
};
</script>
