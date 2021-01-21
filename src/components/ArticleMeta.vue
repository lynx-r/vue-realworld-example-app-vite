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
      <span class="date">{{ article.createdAt | date }}</span>
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
import { defineComponent } from 'vue'
import ArticleActions from 'components/ArticleActions.vue'
import { Article } from 'components/models'

interface ArticleMetaProps {
  article: Article
  actions: any
  currentUser
  isAuthenticated
}

export default defineComponent({
  name: 'ArticleMeta',
  components: {
    ArticleActions
  },
  setup (props: ArticleMetaProps, context) {
    const {
      actions,
      article,
      currentUser,
      isAuthenticated
    } = props

    function isCurrentUser () {
      if (currentUser.username && article.author.username) {
        return currentUser.username === article.author.username
      }
      return false
    }

    function toggleFavorite () {
      if (!isAuthenticated) {
        // todo
        context.router.push({ name: 'login' })
        return
      }
      // const action = article.favorited ? FAVORITE_REMOVE : FAVORITE_ADD
      // todo
      // this.$store.dispatch(action, this.article.slug);
    }

    return {
      ...props,
      isCurrentUser,
      toggleFavorite
    }
  }
})
</script>
