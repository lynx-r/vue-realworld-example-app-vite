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
import { computed, defineComponent } from 'vue'
import ArticleMeta from 'components/ArticleMeta.vue'
import { Article } from 'components/models'
import TagList from 'components/TagList.vue'

interface ArticlePreviewProps {
  article: Article
}

export default defineComponent({
  name: 'ArticlePreview',
  components: {
    ArticleMeta,
    TagList
  },
  setup (props: ArticlePreviewProps) {
    const { article } = props
    const articleLink = computed(() => ({
      name: 'article',
      params: { slug: article.slug }
    }))
    return {
      article,
      articleLink
    }
  }
})
</script>
