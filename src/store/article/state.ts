import { Article, User,Comment } from '~/components/models'

export interface ArticleStateInterface {
  article: Article,
  isLoading: boolean,
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
    isLoading: false,
    comments: []
  }
}

export default state
