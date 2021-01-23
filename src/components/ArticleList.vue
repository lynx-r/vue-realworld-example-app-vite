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
      <VPagination :pages="pages" v-model:currentPage="currentPage"/>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, toRef, toRefs, watch } from 'vue'
import { Article, Filter, ListConfig } from '~/components/models'
import VArticlePreview from '~/components/VArticlePreview.vue'
import VPagination from '~/components/VPagination.vue'
import { useStore } from '~/store'
import { HomeActionTypes } from '~/store/home/home-action-types'

interface ArticleListProps {
  type?: any
  author?: any
  tag?: string
  favorited?: boolean
  itemsPerPage?: number
}

export default defineComponent({
  name: 'ArticleList',
  props: [
    'author',
    'favorited',
    'itemsPerPage',
    'tag',
    'type',
  ],
  components: {
    VArticlePreview,
    VPagination
  },
  setup: function (props: ArticleListProps) {
    const {
      author,
      favorited,
      tag,
      type,
    } = toRefs(props)

    const itemsPerPage = toRef(props, 'itemsPerPage')

    const store = useStore()
    const isLoading = computed(() => store.getters['home/isLoading'])
    const articlesCount = computed(() => store.getters['home/articlesCount'])
    const articles = computed<Article[]>(() => store.getters['home/articles'])

    const currentPage = ref(1)
    const listConfig = computed<ListConfig>(() => {
      const ipp = itemsPerPage.value || 10
      const cp = currentPage.value
      const filter: Filter = {
        offset: (cp - 1) * ipp,
        limit: ipp,
      }
      if (author) {
        filter.author = author
      }
      if (tag) {
        filter.tag = tag
      }
      if (favorited) {
        filter.favorited = favorited
      }
      return {
        type: type.value,
        filter
      }
    })

    const pages = computed(() => {
      if (isLoading || articlesCount.value <= itemsPerPage!) {
        return []
      }
      return [
        ...Array(Math.ceil(articlesCount.value / itemsPerPage!)).keys()
      ].map(e => e + 1)
    })

    function fetchArticles() {
      store.dispatch(HomeActionTypes.FETCH_ARTICLES, listConfig.value)
    }

    function resetPagination() {
      listConfig.value.offset = 0
      currentPage.value = 1
    }

    watch(currentPage, (newValue) => {
      listConfig.value.offset = (newValue - 1) * itemsPerPage!
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
      isLoading,
      articles,
      listConfig,
      pages,
      currentPage,
    }
  }
})
</script>
