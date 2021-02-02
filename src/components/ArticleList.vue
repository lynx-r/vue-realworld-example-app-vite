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
import { computed, defineComponent, onMounted, PropType, reactive, ref, toRef, watch } from 'vue'
import { Article, ListConfig, ListType } from '~/components/models'
import VArticlePreview from '~/components/VArticlePreview.vue'
import VPagination from '~/components/VPagination.vue'
import { useStore } from '~/store'
import { HomeActionTypes } from '~/store/home/home-action-types'

export default defineComponent({
  name: 'ArticleList',
  props: {
    type: {
      type: String as PropType<ListType>,
      required: false,
      default: 'all'
    },
    author: {
      type: String,
      required: false
    },
    tag: {
      type: String,
      required: false
    },
    favorited: {
      type: String,
      required: false
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10
    }
  },
  components: {
    VArticlePreview,
    VPagination
  },
  setup(props) {
    const store = useStore()

    const isLoading = computed(() => store.getters['home/isLoading'])
    const articlesCount = computed(() => store.getters['home/articlesCount'])
    const articles = computed<Article[]>(() => store.getters['home/articles'])
    const itemsPerPageProp = toRef(props, 'itemsPerPage')
    const itemsPerPage = computed(() => itemsPerPageProp.value)

    const currentPage = ref(1)

    const listConfig = reactive<ListConfig>({
      filter: {
        limit: props.itemsPerPage,
        offset: currentPage.value,
        favorited: props.favorited,
        author: props.author,
        tag: props.tag
      },
      type: props.type || 'all'
    })

    const pages = computed(() => {
      if (isLoading.value || articlesCount.value <= itemsPerPage.value) {
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

    watch(props, () => {
      listConfig.filter = {
        limit: props.itemsPerPage,
        offset: currentPage.value,
        favorited: props.favorited,
        author: props.author,
        tag: props.tag
      }
      listConfig.type = props.type
    })

    onMounted(() => {
      fetchArticles()
    })

    watch(currentPage, (newValue) => {
      listConfig.filter.offset = (newValue - 1) * itemsPerPage.value
      fetchArticles()
    })

    watch(props, () => {
      resetPagination()
      fetchArticles()
    }, {deep: true})

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
