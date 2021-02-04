import { Article, Tag } from 'components/models'
import { StateWithModuleName } from '~/store/models'

export interface HomeStateInterface extends StateWithModuleName {
  tags: Tag[]
  articles: Article[]
  isLoading: boolean
  articlesCount: number
  readonly moduleName: string
}

const state: HomeStateInterface = {
  moduleName: 'home',
  tags: [],
  articles: [],
  isLoading: true,
  articlesCount: 0
}

export default state
