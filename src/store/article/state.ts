import * as _ from 'lodash'
import { Article, User,Comment } from '~/components/models'

export interface ArticleStateInterface {
  article: Article,
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
  comments: []
}

function state(): ArticleStateInterface {
  return _.cloneDeep({...initialState})
}

export default state
