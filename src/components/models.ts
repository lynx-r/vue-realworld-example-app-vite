export type Tag = string

export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Article {
  author: User
  title: string
  description: string
  body: string
  tagList: Tag[]
  favoritesCount?: number
  slug?: string
  comment?: string
  favorited?: boolean
  createdAt?: string
}

export interface User {
  email: string
  following: boolean
  username: string
  bio: string
  image: string
  password: string
}

export type ListType = 'feed' | 'all'

export interface Filter {
  offset: number
  limit: number
  author: User
  tag: string
  favorited: boolean
}

export interface ListConfig {
  type: ListType
  filter: Filter
}

export type Errors = {[key: string]: any} | null

export type Comment = string
