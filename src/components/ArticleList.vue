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
import { computed, defineComponent, onMounted, reactive, ref, toRef, watch } from 'vue'
import { Article, ListConfig } from '~/components/models'
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
  setup(props: ArticleListProps) {
    const store = useStore()
    const isLoading = computed(() => store.getters['home/isLoading'])
    const articlesCount = computed(() => store.getters['home/articlesCount'])
    const articles = computed<Article[]>(() => store.getters['home/articles'])
    const itemsPerPageProp = toRef(props, 'itemsPerPage')
    const itemsPerPage = computed(() => itemsPerPageProp.value || 10)

    const currentPage = ref(1)

    const listConfig = reactive<ListConfig>({
      filter: {
        limit: props.itemsPerPage || 10,
        offset: currentPage.value,
        favorited: props.favorited,
        author: props.author,
        tag: props.tag
      },
      type: 'all'
    })

    watch(props, () => {
      listConfig.filter = {
        limit: props.itemsPerPage || 10,
        offset: currentPage.value,
        favorited: props.favorited,
        author: props.author,
        tag: props.tag
      }
      listConfig.type = props.type
    })

    const pages = computed(() => {
      if (isLoading || articlesCount.value <= itemsPerPage.value) {
        return []
      }
      return [
        ...Array(Math.ceil(articlesCount.value / itemsPerPage.value)).keys()
      ].map(e => e + 1)
    })

    const fetchArticles = () => store.dispatch(HomeActionTypes.FETCH_ARTICLES, listConfig)

    const resetPagination = () => {
      listConfig.filter.offset = 0
      currentPage.value = 1
    }

    watch(currentPage, (newValue) => {
      listConfig.filter.offset = (newValue - 1) * itemsPerPage.value
      fetchArticles()
    })

    watch(props, () => {
      resetPagination()
      fetchArticles()
    }, {deep: true})

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
