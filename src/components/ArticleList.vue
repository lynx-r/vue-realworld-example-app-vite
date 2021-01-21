<template>
  <div>
    <div v-if="isLoading" class="article-preview">Loading articles...</div>
    <div v-else>
      <div v-if="articles.length === 0" class="article-preview">
        No articles are here... yet.
      </div>
      <VArticlePreview
          v-for="(article, index) in articles"
          :article="article"
          :key="article.title + index"
      />
      <VPagination :pages="pages" :currentPage.sync="currentPage"/>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import VArticlePreview from 'components/VArticlePreview.vue'
import VPagination from 'components/VPagination.vue'
import { useStore } from 'vuex'

interface ArticleListProps {
  type?
  author?
  tag?: string
  favorited?: boolean
  itemsPerPage?: number
  isLoading: boolean
  articles: any[]
  articlesCount: number
}

export default defineComponent({
  name: 'ArticleList',
  components: {
    VArticlePreview,
    VPagination
  },
  setup: function (props: ArticleListProps, context) {
    const {
      author,
      favorited,
      itemsPerPage,
      tag,
      type,
    } = props

    const store = useStore()

    const currentPage = ref(1)
    const listConfig = computed(() => {
      const filters = {
        offset: (currentPage - 1) * itemsPerPage,
        limit: itemsPerPage
      }
      if (author) {
        filters.author = author
      }
      if (tag) {
        filters.tag = tag
      }
      if (favorited) {
        filters.favorited = favorited
      }
      return {
        type,
        filters
      }
    })

    const pages = computed(() => {
      if (isLoading || articlesCount <= itemsPerPage) {
        return []
      }
      return [
        ...Array(Math.ceil(articlesCount / itemsPerPage)).keys()
      ].map(e => e + 1)
    })

    const getters = mapGetters({
      articlesCount: 'home/articlesCount',
      isLoading: 'home/isLoading',
      articles: 'home/articles'
    })

    function fetchArticles () {
      console.log(context)
      console.log('try fetch articles')
      // todo
      // this.$store.dispatch(FETCH_ARTICLES, this.listConfig);
    }

    function resetPagination () {
      listConfig.offset = 0
      currentPage.value = 1
    }

    watch(currentPage, (newValue) => {
      listConfig.filters.offset = (newValue - 1) * itemsPerPage
      fetchArticles()
    })

    watch(() => [type, author, tag, favorited], () => {
      resetPagination()
      fetchArticles()
    })

    onMounted(() => {
      fetchArticles()
    })

    return {
      ...getters,
      listConfig,
      pages,
      currentPage,
    }
  }
})
</script>
