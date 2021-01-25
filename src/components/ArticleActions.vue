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
import { useRouter } from 'vue-router'
import { Article } from '~/components/models'
import { useStore } from '~/store'
import { FETCH_PROFILE_FOLLOW, FETCH_PROFILE_UNFOLLOW } from '~/store/actions.type'
import { ArticleActionTypes } from '~/store/article/article-action-types'

interface ArticleActionsProps {
  article: Article
  canModify: boolean
}

export default defineComponent({
  name: 'ArticleActions',
  props: ['article', 'canModify'],
  setup(props: ArticleActionsProps) {
    const {
      article,
      canModify
    } = props

    const router = useRouter()
    const store = useStore()

    const profile = computed(() => store.getters.profile)
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

    const editArticleLink = computed(() => ({
      name: 'article-edit',
      params: {slug: article.slug}
    }))
    const toggleFavoriteButtonClasses = computed(() => ({
      'btn-primary': article.favorited,
      'btn-outline-primary': !article.favorited
    }))
    const followUserLabel = computed(() =>
        `${profile.value.following ? 'Unfollow' : 'Follow'} ${
            article.author.username
        }`)
    const favoriteArticleLabel = computed(() => article.favorited ? 'Unfavorite Article' : 'Favorite Article')
    const favoriteCounter = computed(() => `(${article.favoritesCount})`)

    function toggleFavorite() {
      if (!isAuthenticated) {
        router.push({name: 'login'})
        return
      }
      const action: string = article.favorited ? ArticleActionTypes.FAVORITE_REMOVE : ArticleActionTypes.FAVORITE_ADD
      // todo
      store.dispatch(action, article.slug)
    }

    function toggleFollow() {
      if (!isAuthenticated) {
        router.push({name: 'login'})
        return
      }
      const action = this.article.following
          ? FETCH_PROFILE_UNFOLLOW
          : FETCH_PROFILE_FOLLOW
      // todo
      store.dispatch(action, {
        username: profile.value.username
      })
    }

    async function deleteArticle() {
      try {
        await store.dispatch(ArticleActionTypes.ARTICLE_DELETE, article.slug)
        // todo
        await router.push('/')
      } catch (err) {
        console.error(err)
      }
    }

    return {
      profile,
      isAuthenticated,
      canModify,
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
