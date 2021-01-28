<template>
  <div v-if="!!article?.value" class="article-page">
    <div class="banner">
      <div class="container">
        <h1>{{ article.value.title }}</h1>
        <ArticleMeta :article="article" :actions="true"></ArticleMeta>
      </div>
    </div>
    <div class="container page">
      <div class="row article-content">
        <div class="col-xs-12">
          <div v-html="parseMarkdown(article.value.body)"></div>
          <ul class="tag-list">
            <li v-for="(tag, index) of article.tagList" :key="tag + index">
              <VTag
                  :name="tag"
                  className="tag-default tag-pill tag-outline"
              ></VTag>
            </li>
          </ul>
        </div>
      </div>
      <hr/>
      <div class="article-actions">
        <ArticleMeta :article="article" :actions="true"></ArticleMeta>
      </div>
      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <CommentEditor
              v-if="isAuthenticated"
              :slug="slug"
              :userImage="currentUser.image"
          >
          </CommentEditor>
          <p v-else>
            <router-link :to="{ name: 'login' }">Sign in</router-link>
            or
            <router-link :to="{ name: 'register' }">sign up</router-link>
            to add comments on this article.
          </p>
          <Comment
              v-for="(comment, index) in comments"
              :slug="slug"
              :comment="comment"
              :key="index"
          >
          </Comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import marked from 'marked'
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import ArticleMeta from '~/components/ArticleMeta.vue'
import CommentEditor from '~/components/CommentEditor.vue'
import VTag from '~/components/VTag.vue'
import { useStore } from '~/store'
import { ArticleActionTypes } from '~/store/article/article-action-types'

export default defineComponent({
  name: 'Article',
  props: {
    slug: {
      type: String,
      required: true
    }
  },
  components: {
    ArticleMeta,
    Comment,
    CommentEditor,
    VTag
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    const article = computed(() => store.getters['article/article'])
    const currentUser = computed(() => store.getters['auth/currentUser'])
    const isAuthenticated = computed(() => store.getters['auth/isAuthenticated'])
    const comments = computed(() => store.getters['article/comments'])

    const parseMarkdown = (content: string) => marked(content)

    router.beforeResolve((to, from, next) => {
      console.log('???', to, from)
      return Promise.all([
        store.dispatch(ArticleActionTypes.FETCH_ARTICLE, to.params.slug),
        store.dispatch(ArticleActionTypes.FETCH_COMMENTS, to.params.slug)
      ]).then(() => {
        next()
      })
    })

    return {article, currentUser, comments, isAuthenticated, parseMarkdown}
  }
})
</script>
