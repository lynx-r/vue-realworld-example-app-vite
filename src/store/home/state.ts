import { Article } from 'components/models'

export interface HomeStateInterface {
  tags: string[]
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
