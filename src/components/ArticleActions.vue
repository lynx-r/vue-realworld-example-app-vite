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
import { computed, defineComponent, PropType, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { Article } from '~/components/models'
import { useStore } from '~/store'
import { ArticleActionTypes } from '~/store/article/article-action-types'
import { ProfileActionTypes } from '~/store/profile/profile-action-types'

export default defineComponent({
  name: 'ArticleActions',
  props: {
    article: {type: Object as PropType<Article>, required: true},
    canModify: {type: Boolean, required: true}
  },
  setup(props) {
    const router = useRouter()
    const store = useStore()

    const profile = computed(() => store.getters['profile/profile'])
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])

    const editArticleLink = computed(() => ({
      name: 'article-edit',
      params: {slug: props.article.slug}
    }))
    const toggleFavoriteButtonClasses = computed(() => ({
      'btn-primary': props.article.favorited,
      'btn-outline-primary': !props.article.favorited
    }))
    const followUserLabel = computed(() =>
        `${profile.value.following ? 'Unfollow' : 'Follow'} ${
            props.article.author.username
        }`)
    const favoriteArticleLabel = computed(() =>
        props.article.favorited
            ? 'Unfavorite Article'
            : 'Favorite Article')
    const favoriteCounter = computed(() => `(${props.article.favoritesCount})`)

    const toggleFavorite = () => {
      if (!isAuthenticated.value) {
        router.push({name: 'login'})
        return
      }
      const action = props.article.favorited ? ArticleActionTypes.FAVORITE_REMOVE : ArticleActionTypes.FAVORITE_ADD
      store.dispatch(action, props.article.slug)
    }

    const toggleFollow = () => {
      if (!isAuthenticated.value) {
        router.push({name: 'login'})
        return
      }
      const action = props.article.following
          ? ProfileActionTypes.FETCH_PROFILE_UNFOLLOW
          : ProfileActionTypes.FETCH_PROFILE_FOLLOW
      store.dispatch(action, {
        username: profile.value.username
      })
    }

    const deleteArticle = async () => {
      try {
        await store.dispatch(ArticleActionTypes.ARTICLE_DELETE, props.article.slug)
        await router.push({name: 'home'})
      } catch (err) {
        console.error(err)
      }
    }

    return {
      canModify: props.canModify,
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
