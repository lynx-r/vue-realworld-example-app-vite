import { ActionContext, ActionTree, CommitOptions } from 'vuex'
import { ArticlesService, CommentsService, FavoriteService } from '~/common/api.service'
import { Article, Comment } from '~/components/models'
import { HomeMutationTypes } from '~/store/home/home-mutation-types'
import { HomeMutations } from '~/store/home/mutations'
import { StateInterface } from '..'
import { ArticleActionTypes } from './article-action-types'
import { ArticleMutationTypes } from './article-mutation-types'
import { ArticleMutations } from './mutations'
import { ArticleStateInterface } from './state'

type ArticleAndHomeMutations = ArticleMutations & HomeMutations

type AugmentedActionContext = {
  commit<K extends keyof ArticleAndHomeMutations>(
    key: K,
    payload?: Parameters<ArticleAndHomeMutations[K]>[1],
    options?: CommitOptions
  ): ReturnType<ArticleAndHomeMutations[K]>
} & Omit<ActionContext<ArticleStateInterface, StateInterface>, 'commit'>

export interface ArticleActions {
  [ArticleActionTypes.FETCH_ARTICLE](context: AugmentedActionContext,
                                     payload: { slug: string, prevArticle: Article }): Promise<Article | void>

  [ArticleActionTypes.FETCH_COMMENTS](context: AugmentedActionContext, articleSlug: string): Promise<Comment[]>

  [ArticleActionTypes.COMMENT_CREATE](context: AugmentedActionContext, payload: { slug: string, comment: string }): void

  [ArticleActionTypes.COMMENT_DESTROY](context: AugmentedActionContext, payload: { slug: string, commentId: string }): void

  [ArticleActionTypes.FAVORITE_ADD](context: AugmentedActionContext, payload: string): void

  [ArticleActionTypes.FAVORITE_REMOVE](context: AugmentedActionContext, payload: string): void

  [ArticleActionTypes.ARTICLE_PUBLISH](context: AugmentedActionContext): Promise<Article>

  [ArticleActionTypes.ARTICLE_DELETE](context: AugmentedActionContext, slug: string): Promise<Article>

  [ArticleActionTypes.ARTICLE_EDIT](context: AugmentedActionContext, slug: string): Promise<Article>

  [ArticleActionTypes.ARTICLE_EDIT_ADD_TAG](context: AugmentedActionContext, tag: string): void

  [ArticleActionTypes.ARTICLE_EDIT_REMOVE_TAG](context: AugmentedActionContext, tag: string): void

  [ArticleActionTypes.ARTICLE_RESET_STATE](context: AugmentedActionContext): void
}

const actions: ActionTree<ArticleStateInterface, StateInterface> & ArticleActions = {
  async [ArticleActionTypes.FETCH_ARTICLE]({commit}, {slug, prevArticle}) {
    // avoid extronuous network call if article exists
    if (prevArticle !== undefined) {
      return commit(ArticleMutationTypes.SET_ARTICLE, prevArticle)
    }
    const {data} = await ArticlesService.get(slug)
    commit(ArticleMutationTypes.SET_ARTICLE, data.article)
    return data as Article
  },
  async [ArticleActionTypes.FETCH_COMMENTS](context, articleSlug) {
    const {data} = await CommentsService.get(articleSlug)
    context.commit(ArticleMutationTypes.SET_COMMENTS, data.comments)
    return data.comments
  },
  async [ArticleActionTypes.COMMENT_CREATE](context, payload) {
    await CommentsService.post(payload.slug, payload.comment)
    await context.dispatch(ArticleMutationTypes.FETCH_COMMENTS, payload.slug)
  },
  async [ArticleActionTypes.COMMENT_DESTROY](context, payload) {
    await CommentsService.destroy(payload.slug!, payload.commentId!)
    await context.dispatch(ArticleMutationTypes.FETCH_COMMENTS, payload.slug)
  },
  async [ArticleActionTypes.FAVORITE_ADD](context, slug) {
    const {data} = await FavoriteService.add(slug)
    context.commit(HomeMutationTypes.UPDATE_ARTICLE_IN_LIST, data.article, {root: true})
    context.commit(ArticleMutationTypes.SET_ARTICLE, data.article)
  },
  async [ArticleActionTypes.FAVORITE_REMOVE](context, slug) {
    const {data} = await FavoriteService.remove(slug)
    // Update list as well. This allows us to favorite an article in the Home view.
    context.commit(HomeMutationTypes.UPDATE_ARTICLE_IN_LIST, data.article, {root: true})
    context.commit(ArticleMutationTypes.SET_ARTICLE, data.article)
  },
  [ArticleActionTypes.ARTICLE_PUBLISH]({state}) {
    return ArticlesService.create(state.article)
  },
  [ArticleActionTypes.ARTICLE_DELETE](context, slug) {
    return ArticlesService.destroy(slug)
  },
  [ArticleActionTypes.ARTICLE_EDIT]({state}) {
    return ArticlesService.update(state.article.slug!, state.article)
  },
  [ArticleActionTypes.ARTICLE_EDIT_ADD_TAG](context, tag) {
    context.commit(ArticleMutationTypes.TAG_ADD, tag)
  },
  [ArticleActionTypes.ARTICLE_EDIT_REMOVE_TAG](context, tag) {
    context.commit(ArticleMutationTypes.TAG_REMOVE, tag)
  },
  [ArticleActionTypes.ARTICLE_RESET_STATE]({commit}) {
    commit(ArticleMutationTypes.RESET_STATE)
  }
}

export default actions
