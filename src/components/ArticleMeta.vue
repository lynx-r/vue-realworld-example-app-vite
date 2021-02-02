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
import { computed, defineComponent, PropType, toRef, toRefs, watch, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import date from '~/common/date.filter'
import ArticleActions from '~/components/ArticleActions.vue'
import { Article } from '~/components/models'
import { useStore } from '~/store'
import { ArticleActionTypes } from '~/store/article/article-action-types'

export default defineComponent({
  name: 'ArticleMeta',
  props: {
    article: {
      type: Object as PropType<Article>,
      required: true
    },
    actions: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  components: {
    ArticleActions
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()

    const {article, actions} = toRefs(props)

    const currentUser = computed(() => store.getters['auth/currentUser'])
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

    const isCurrentUser = () =>
        currentUser.value.username && props.article.author.username
            ? currentUser.value.username === props.article.author.username
            : false

    const toggleFavorite = () => {
      if (!isAuthenticated.value) {
        router.push({name: 'login'})
        return
      }
      const action = props.article.favorited
          ? ArticleActionTypes.FAVORITE_REMOVE
          : ArticleActionTypes.FAVORITE_ADD
      store.dispatch(action, props.article.slug)
    }

    return {
      actions,
      article,
      isCurrentUser,
      toggleFavorite,
      date,
    }
  }
})
</script>
