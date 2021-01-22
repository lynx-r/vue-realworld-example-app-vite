import { Article, Tag } from 'components/models'

export interface HomeStateInterface {
  tags: Tag
  articles: Article[]
  isLoading: boolean
  articlesCount: number
}

function state(): HomeStateInterface {
  return {
    tags: [],
    articles: [],
    isLoading: true,
    articlesCount: 0
  };
}

export default state;
