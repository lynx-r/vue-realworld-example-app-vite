import { makeAxios } from '@vue-composable/axios'
import axiosLib, { AxiosInstance } from 'axios'
import { Article } from 'components/models'
import { API_URL } from './config'
import JwtService from './jwt.service'

const axiosClient = axiosLib.create({baseURL: API_URL})

interface IApiService {
  axios: AxiosInstance
  setHeader: () => void
  query: (resource: string, params: any) => Promise<any>
  get: (resource: string, slug?: string) => Promise<any>
  post: (resource: string, params?: any) => Promise<any>
  update: (resource: string, slug: string, params?: any) => Promise<any>
  put: (resource: string, params?: any) => Promise<any>
  delete: (resource: string) => Promise<any>
}

// const {client} = makeAxios(axiosClient)

const ApiService: IApiService = {
  axios: axiosClient,

  setHeader() {
    this.axios.defaults.headers.common[
      'Authorization'
      ] = `Token ${JwtService.getToken()}`
  },

  query(resource, params) {
    return this.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  },

  get(resource, slug = '') {
    return this.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  },

  post(resource, params) {
    return this.axios.post(`${resource}`, params)
  },

  update(resource, slug, params) {
    return this.axios.put(`${resource}/${slug}`, params)
  },

  put(resource, params) {
    return this.axios.put(`${resource}`, params)
  },

  delete(resource) {
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
    console.log('slug', slug)
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
