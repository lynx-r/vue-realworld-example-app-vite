import * as _ from 'lodash'
import { Article, User, Comment } from '~/components/models'
import { StateWithModuleName } from '~/store/models'

export interface ArticleStateInterface extends StateWithModuleName {
  article: Article
  comments: Comment[]
}

export const initialState = {
  article: {
    author: {} as User,
    title: '',
    description: '',
    body: '',
    tagList: []
  },
  comments: [],
  moduleName: 'article',
}

const state: ArticleStateInterface = {...initialState}

export default state
