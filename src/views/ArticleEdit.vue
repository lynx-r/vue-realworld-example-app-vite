<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">
        <div v-if="isLoaded" class="col-md-10 offset-md-1 col-xs-12">
          <ListErrors :errors="errors"/>
          <form @submit.prevent="onPublish()">
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
import { Article, Errors } from '~/components/models'
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
    const isLoaded = ref(false)

    const article = computed(() => store.getters['article/article'])

    onMounted(async () => {
      await store.dispatch(ArticleActionTypes.ARTICLE_RESET_STATE)
      const params = route.params
      if (!!params.slug) {
        // if editing
        await store.dispatch(ArticleActionTypes.FETCH_ARTICLE, {slug: params.slug as string})
      }
      isLoaded.value = true
    })

    onBeforeRouteUpdate(async (to, from, next) => {
      await store.dispatch(ArticleActionTypes.ARTICLE_RESET_STATE)
      return next()
    })

    onBeforeRouteLeave(async (to, from, next) => {
      await store.dispatch(ArticleActionTypes.ARTICLE_RESET_STATE)
      next()
    })

    const onPublish = () => {
      const action = !!article.value.slug ? ArticleActionTypes.ARTICLE_EDIT : ArticleActionTypes.ARTICLE_PUBLISH
      inProgress.value = true
      store
          .dispatch(action)
          .then((article) => {
            router.push({
              name: 'article',
              params: {slug: article.slug!}
            })
            inProgress.value = false
          })
          .catch(({response}) => {
            inProgress.value = false
            console.log(response)
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

    return {isLoaded, tagInput, inProgress, errors, article, onPublish, removeTag, addTag}
  },
})
</script>
