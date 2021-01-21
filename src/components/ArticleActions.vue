<template>

  <!-- Used when user is also author -->
  <span v-if="canModify">
    <router-link class="btn btn-sm btn-outline-secondary" :to="editArticleLink">
      <i class="ion-edit"></i> <span>&nbsp;Edit Article</span>
    </router-link>
    <span>&nbsp;&nbsp;</span>
    <button class="btn btn-outline-danger btn-sm" @click="deleteArticle">
      <i class="ion-trash-a"></i> <span>&nbsp;Delete Article</span>
    </button>
  </span>
  <!-- Used in ArticleView when not author -->
  <span v-else>
    <button class="btn btn-sm btn-outline-secondary" @click="toggleFollow">
      <i class="ion-plus-round"></i> <span>&nbsp;</span>
      <span v-text="followUserLabel"/>
    </button>
    <span>&nbsp;&nbsp;</span>
    <button
        class="btn btn-sm"
        @click="toggleFavorite"
        :class="toggleFavoriteButtonClasses"
    >
      <i class="ion-heart"></i> <span>&nbsp;</span>
      <span v-text="favoriteArticleLabel"/> <span>&nbsp;</span>
      <span class="counter" v-text="favoriteCounter"/>
    </button>
  </span>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { Article } from 'components/models'

interface ArticleActionsProps {
  article: Article
  canModify: boolean
  isAuthenticated: boolean
  profile: any
}

export default defineComponent({
  name: 'ArticleActions',
  setup (props: ArticleActionsProps, context) {
    const {
      article,
      canModify
    } = props
    const editArticleLink = computed(() => ({
      name: 'article-edit',
      params: { slug: article.slug }
    }))
    const toggleFavoriteButtonClasses = computed(() => ({
      'btn-primary': article.favorited,
      'btn-outline-primary': !article.favorited
    }))
    const followUserLabel = computed(() =>
        `${this.profile.following ? 'Unfollow' : 'Follow'} ${
            article.author.username
        }`)
    const favoriteArticleLabel = computed(() => article.favorited ? 'Unfavorite Article' : 'Favorite Article')
    const favoriteCounter = computed(() => `(${this.article.favoritesCount})`)

    function toggleFavorite () {
      if (!isAuthenticated) {
        context.router.push({ name: 'login' })
        return
      }
      const action = article.favorited ? FAVORITE_REMOVE : FAVORITE_ADD
      // todo
      // context.store.dispatch(action, article.slug)
    }

    function toggleFollow () {
      if (!isAuthenticated) {
        context.router.push({ name: 'login' })
        return
      }
      const action = this.article.following
          ? FETCH_PROFILE_UNFOLLOW
          : FETCH_PROFILE_FOLLOW
      // todo
      // this.$store.dispatch(action, {
      //   username: this.profile.username
      // })
    }

    async function deleteArticle () {
      try {
        await this.$store.dispatch(ARTICLE_DELETE, this.article.slug)
        // todo
        // this.$router.push('/')
      } catch (err) {
        console.error(err)
      }
    }

    return {
      canModify,
      isAuthenticated,
      profile,
      editArticleLink,
      toggleFavoriteButtonClasses,
      followUserLabel,
      favoriteArticleLabel,
      favoriteCounter,
      toggleFavorite,
      toggleFollow,
      deleteArticle
    }
  }
})
</script>
