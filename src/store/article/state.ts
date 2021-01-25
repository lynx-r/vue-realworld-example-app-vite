import { Article, User,Comment } from '~/components/models'

export interface ArticleStateInterface {
  article: Article,
  comments: Comment[]
}

function state(): ArticleStateInterface {
  return {
    article: {
      author: {} as User,
      title: '',
      description: '',
      body: '',
      tagList: []
    },
    comments: []
  }
}

export default state
