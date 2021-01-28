<template>
  <div class="article-meta">
    <router-link
        :to="{ name: 'profile', params: { username: article.author.username } }"
    >
      <img :src="article.author.image" alt=""/>
    </router-link>
    <div class="info">
      <router-link
          :to="{ name: 'profile', params: { username: article.author.username } }"
          class="author"
      >
        {{ article.author.username }}
      </router-link>
      <span class="date">{{ date(article.createdAt) }}</span>
    </div>
    <article-actions
        v-if="actions"
        :article="article"
        :canModify="isCurrentUser()"
    ></article-actions>
    <button
        v-else
        class="btn btn-sm pull-xs-right"
        @click="toggleFavorite"
        :class="{
        'btn-primary': article.favorited,
        'btn-outline-primary': !article.favorited
      }"
    >
      <i class="ion-heart"></i>
      <span class="counter">&nbsp;{{ article.favoritesCount }}</span>
    </button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import date from '~/common/date.filter'
import ArticleActions from '~/components/ArticleActions.vue'
import { Article } from '~/components/models'
import { useStore } from '~/store'
import { ArticleActionTypes } from '~/store/article/article-action-types'

interface ArticleMetaProps {
  article: Article
  actions: any
  currentUser: any
  isAuthenticated: boolean
}

export default defineComponent({
  name: 'ArticleMeta',
  props: ['article', 'actions', 'isAuthenticated'],
  components: {
    ArticleActions
  },
  setup(props: ArticleMetaProps) {
    const {
      actions,
      article,
      isAuthenticated
    } = toRefs(props)


    const router = useRouter()
    const store = useStore()

    const currentUser = computed(() => store.getters['auth/currentUser'])

    const isCurrentUser = () =>
        currentUser.username && article.author.username
            ? currentUser.username === article.author.username
            : false

    const toggleFavorite = () => {
      if (!isAuthenticated) {
        // todo
        router.push({name: 'login'})
        return
      }
      const action: string = article.favorited ? ArticleActionTypes.FAVORITE_REMOVE : ArticleActionTypes.FAVORITE_ADD
      store.dispatch(action, article.slug)
    }

    return {
      article,
      actions,
      isCurrentUser,
      toggleFavorite,
      date,
    }
  }
})
</script>
