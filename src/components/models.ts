export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface Article {
  favoritesCount: number
  author: any
  slug: string
  title: string
  description: string
  favorited: boolean
  tagList: string[]
  createdAt: string
}

export interface User {
  email: string
  username: string
  bio: string
  image: string
  password: string
}

export type Errors = {[key: string]: any} | null
