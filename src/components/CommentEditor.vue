<template>
  <div>
    <ListErrors :errors="errors"/>
    <form class="card comment-form" @submit.prevent="onSubmit(slug, comment)">
      <div class="card-block">
        <textarea
            class="form-control"
            v-model="comment"
            placeholder="Write a comment..."
            rows="3"
        >
        </textarea>
      </div>
      <div class="card-footer">
        <img :src="userImage" class="comment-author-img"/>
        <button class="btn btn-sm btn-primary">Post Comment</button>
      </div>
    </form>
  </div>
</template>

<script>
import { ArticleActionTypes } from '~/store/article/article-action-types'
import ListErrors from './ListErrors.vue'

export default {
  name: 'CommentEditor',
  components: {ListErrors},
  props: {
    slug: {type: String, required: true},
    content: {type: String, required: false},
    userImage: {type: String, required: false}
  },

  data() {
    return {
      comment: this.content || null,
      errors: {}
    }
  },

  methods: {
    onSubmit(slug, newComment) {
      this.$store
          .dispatch(ArticleActionTypes.COMMENT_CREATE, {slug, comment: newComment})
          .then(() => {
            this.comment = null
            this.errors = {}
          })
          .catch(({response}) => {
            this.errors = response.data.errors
          })
    }
  }
}
</script>
