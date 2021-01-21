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
      <span class="date">{{ article.createdAt }}</span>
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
      <span class="counter"> {{ article.favoritesCount }} </span>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ArticleActions from '~/components/ArticleActions.vue'
import { Article } from '~/components/models'
import { FAVORITE_ADD, FAVORITE_REMOVE } from '~/store/actions.type'

interface ArticleMetaProps {
  article: Article
  actions: any
  currentUser: any
  isAuthenticated: boolean
}

export default defineComponent({
  name: 'ArticleMeta',
  props: ['article', 'actions', 'currentUser', 'isAuthenticated'],
  components: {
    ArticleActions
  },
  setup(props: ArticleMetaProps) {
    const {
      actions,
      article,
      currentUser,
      isAuthenticated
    } = toRefs(props)

    const router = useRouter()
    const store = useStore()

    function isCurrentUser() {
      if (currentUser.username && article.author.username) {
        return currentUser.username === article.author.username
      }
      return false
    }

    function toggleFavorite() {
      if (!isAuthenticated) {
        // todo
        router.push({name: 'login'})
        return
      }
      const action: string = article.favorited ? FAVORITE_REMOVE : FAVORITE_ADD
      // todo
      store.dispatch(action, article.slug)
    }

    return {
      article,
      actions,
      isCurrentUser,
      toggleFavorite
    }
  }
})
</script>
