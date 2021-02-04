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
  following?: boolean
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

export type UserName = Pick<User, 'username'>
export type Credentials = Pick<User, 'email' | 'password'>
export type RegisterUser = Pick<User, 'email' | 'username' | 'password'>

export type ListType = 'feed' | 'all'

export interface Filter {
  offset: number
  limit: number
  author?: string
  tag?: string
  favorited?: string
}

export interface ListConfig {
  type: ListType
  filter: Filter
}

export type Errors = {[key: string]: any} | null

export type Comment = string
