<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-10 offset-md-1 col-xs-12">
          <ListErrors :errors="errors"/>
          {{ isLoading?.value }}
          <form v-if="!!article" @submit.prevent="onPublish(article.value.slug)">
            <fieldset :disabled="inProgress">
              <fieldset class="form-group">
                <input
                    type="text"
                    class="form-control form-control-lg"
                    v-model="article.title"
                    placeholder="Article Title"
                />
              </fieldset>
              <fieldset class="form-group">
                <input
                    type="text"
                    class="form-control"
                    v-model="article.description"
                    placeholder="What's this article about?"
                />
              </fieldset>
              <fieldset class="form-group">
                <textarea
                    class="form-control"
                    rows="8"
                    v-model="article.body"
                    placeholder="Write your article (in markdown)"
                >
                </textarea>
              </fieldset>
              <fieldset class="form-group">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Enter tags"
                    v-model="tagInput"
                    @keypress.enter.prevent="addTag(tagInput)"
                />
                <div class="tag-list">
                  <span
                      class="tag-default tag-pill"
                      v-for="(tag, index) of article.tagList"
                      :key="tag + index"
                  >
                    <i class="ion-close-round" @click="removeTag(tag)"> </i>
                    {{ tag }}
                  </span>
                </div>
              </fieldset>
            </fieldset>
            <button
                :disabled="inProgress"
                class="btn btn-lg pull-xs-right btn-primary"
                type="submit"
            >
              Publish Article
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue'
import { onBeforeRouteLeave, onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router'
import ListErrors from '~/components/ListErrors.vue'
import { Errors } from '~/components/models'
import { useStore } from '~/store'
import { ArticleActionTypes } from '~/store/article/article-action-types'

export default defineComponent({
  name: 'ArticleEdit',
  components: {ListErrors},
  props: {
    previousArticle: {
      type: Object,
      required: false
    }
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()

    const tagInput = ref('')
    const inProgress = ref(false)
    const errors = ref({} as Errors)

    const article = computed(() => store.getters['article/article'])
    const isLoading = computed(() => store.getters['article/isLoading'])
    console.log('???', article.value)
    console.log(isLoading?.value)

    router.beforeResolve((to, from, next) => {
          console.log('route', to, from)
          return next()
          // return Promise
          //     .all([
          //       store.dispatch(ArticleActionTypes.ARTICLE_RESET_STATE),
          //       store.dispatch(
          //           ArticleActionTypes.FETCH_ARTICLE,
          //           route.params.slug,
          //           route.params.previousArticle
          //       )
          //     ])
          //     .then(next)
        }
    )

    onBeforeRouteUpdate(async (to, from, next) => {
      // Reset state if user goes from /editor/:id to /editor
      // The component is not recreated so we use to hook to reset the state.
      console.log('update')
      await store.dispatch(ArticleActionTypes.ARTICLE_RESET_STATE)
      return next()
    })

    const onPublish = (slug: string) => {
      let action = slug ? ArticleActionTypes.ARTICLE_EDIT : ArticleActionTypes.ARTICLE_PUBLISH
      inProgress.value = true
      store
          .dispatch(action)
          .then(({data}) => {
            inProgress.value = false
            router.push({
              name: 'article',
              params: {slug: data.article.slug}
            })
          })
          .catch(({response}) => {
            inProgress.value = false
            errors.value = response.data.errors
          })
    }

    const removeTag = (tag: string) => {
      store.dispatch(ArticleActionTypes.ARTICLE_EDIT_REMOVE_TAG, tag)
    }

    const addTag = (tag: string) => {
      store.dispatch(ArticleActionTypes.ARTICLE_EDIT_ADD_TAG, tag)
      tagInput.value = ''
    }

    onBeforeRouteLeave(async (to, from, next) => {
      await store.dispatch(ArticleActionTypes.ARTICLE_RESET_STATE)
      next()
    })

    return {isLoading, tagInput, inProgress, errors, article, onPublish, removeTag, addTag}
  },
  // async beforeRouteEnter(to, from, next) {
  //   // SO: https://github.com/vuejs/vue-router/issues/1034
  //   // If we arrive directly to this url, we need to fetch the article
  //   await store.dispatch(ARTICLE_RESET_STATE);
  //   if (to.params.slug !== undefined) {
  //     await store.dispatch(
  //       FETCH_ARTICLE,
  //       to.params.slug,
  //       to.params.previousArticle
  //     );
  //   }
  //   return next();
  // },
})
</script>
