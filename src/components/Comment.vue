<template>
  <div class="card">
    <div class="card-block">
      <p class="card-text">{{ comment.body }}</p>
    </div>
    <div class="card-footer">
      <a href="" class="comment-author">
        <img :src="comment.author.image" class="comment-author-img"/>
      </a>
      <router-link
          class="comment-author"
          :to="{ name: 'profile', params: { username: comment.author.username } }"
      >
        {{ comment.author.username }}
      </router-link>
      <span class="date-posted">{{ date(comment.createdAt) }}</span>
      <span v-if="isCurrentUser" class="mod-options">
        <i class="ion-trash-a" @click="destroy(slug, comment.id)"></i>
      </span>
    </div>
  </div>
</template>

<script lang="ts">

import date from '~/common/date.filter'
import { ArticleActionTypes } from '~/store/article/article-action-types'
import { computed, defineComponent } from 'vue'
import { useStore } from '~/store'

export default defineComponent({
  name: 'Comment',
  props: {
    slug: {type: String, required: true},
    comment: {type: Object, required: true}
  },
  setup(props) {
    const store = useStore()

    const currentUser = computed(() => store.getters['auth/currentUser'])
    const isCurrentUser = computed(() => {
      if (currentUser.value.username && props.comment.author.username) {
        return props.comment.author.username === currentUser.username
      }
      return false
    })

    const destroy = (slug, commentId) => {
      store.dispatch(ArticleActionTypes.COMMENT_DESTROY, {slug, commentId})
    }

    return {...props, currentUser, isCurrentUser, destroy, date}
  },
})
</script>
