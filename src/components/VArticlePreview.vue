<template>
  <div class="article-preview">
    <ArticleMeta isPreview :article="article"/>
    <router-link :to="articleLink" class="preview-link">
      <h1 v-text="article.title"/>
      <p v-text="article.description"/>
      <span>Read more...</span>
      <TagList :tags="article.tagList"/>
    </router-link>
  </div>
</template>

<script lang="ts">
import { Article } from 'components/models'
import { computed, defineComponent, PropType } from 'vue'
import ArticleMeta from '~/components/ArticleMeta.vue'
import TagList from '~/components/TagList.vue'

export default defineComponent({
  name: 'ArticlePreview',
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true
    }
  },
  components: {
    ArticleMeta,
    TagList
  },
  setup(props) {
    const articleLink = computed(() => ({
      name: 'article',
      params: {slug: props.article.slug}
    }))
    return {
      articleLink
    }
  }
})
</script>
