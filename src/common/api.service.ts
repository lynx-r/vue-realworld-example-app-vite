import { makeAxios } from '@vue-composable/axios'
import axios from 'axios'
import { Article } from 'components/models'
import { API_URL } from './config'
import JwtService from './jwt.service'

const axiosClient = axios.create({baseURL: API_URL})

const ApiService = {
  axios,

  init() {
    const {client} = makeAxios(axiosClient)
    this.axios = client
  },

  setHeader() {
    this.axios.defaults.headers.common[
      'Authorization'
      ] = `Token ${JwtService.getToken()}`
  },

  query(resource: string, params: any) {
    return this.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  },

  get(resource: string, slug = '') {
    return this.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  },

  post(resource: string, params?: any) {
    return this.axios.post(`${resource}`, params)
  },

  update(resource: string, slug: string, params: any) {
    return this.axios.put(`${resource}/${slug}`, params)
  },

  put(resource: string, params: any) {
    return this.axios.put(`${resource}`, params)
  },

  delete(resource: string) {
    return this.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  }

}

export default ApiService

export const TagsService = {
  get() {
    return ApiService.get('tags')
  }
}

export const ArticlesService = {
  query(type: string, params: any) {
    return ApiService.query('articles' + (type === 'feed' ? '/feed' : ''), {
      params: params
    })
  },

  get(slug: string) {
    return ApiService.get('articles', slug)
  },

  create(params: Article) {
    return ApiService.post('articles', {article: params})
  },

  update(slug: string, params: Article) {
    return ApiService.update('articles', slug, {article: params})
  },

  destroy(slug: string) {
    return ApiService.delete(`articles/${slug}`)
  }
}

export const CommentsService = {
  get(slug: string) {
    if (typeof slug !== 'string') {
      throw new Error(
        '[RWV] CommentsService.get() article slug required to fetch comments'
      )
    }
    return ApiService.get('articles', `${slug}/comments`)
  },

  post(slug: string, payload: any) {
    return ApiService.post(`articles/${slug}/comments`, {
      comment: {body: payload}
    })
  },

  destroy(slug: string, commentId: string) {
    return ApiService.delete(`articles/${slug}/comments/${commentId}`)
  }
}

export const FavoriteService = {
  add(slug: string) {
    return ApiService.post(`articles/${slug}/favorite`)
  },
  remove(slug: string) {
    return ApiService.delete(`articles/${slug}/favorite`)
  }
}
