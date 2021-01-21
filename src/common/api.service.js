import { useAxios } from '@vue-composable/axios/dist/v3/axios';
import { API_URL } from './config'
import JwtService from './jwt.service'

const ApiService = {
  init () {
    this.axios = useAxios(API_URL)
  },

  setHeader () {
    this.axios.defaults.headers.common[
      'Authorization'
      ] = `Token ${JwtService.getToken()}`
  },

  query (resource, params) {
    debugger
    return this.axios.get(resource, params).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  },

  get (resource, slug = '') {
    return this.axios.get(`${resource}/${slug}`).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  },

  post (resource, params) {
    return this.axios.post(`${resource}`, params)
  },

  update (resource, slug, params) {
    return this.axios.put(`${resource}/${slug}`, params)
  },

  put (resource, params) {
    return this.axios.put(`${resource}`, params)
  },

  delete (resource) {
    return this.axios.delete(resource).catch(error => {
      throw new Error(`[RWV] ApiService ${error}`)
    })
  }
}

export default ApiService

export const TagsService = {
  get () {
    return ApiService.get('tags')
  }
}

export const ArticlesService = {
  query (type, params) {
    return ApiService.query('articles' + (type === 'feed' ? '/feed' : ''), {
      params: params
    })
  },
  get (slug) {
    return ApiService.get('articles', slug)
  },
  create (params) {
    return ApiService.post('articles', { article: params })
  },
  update (slug, params) {
    return ApiService.update('articles', slug, { article: params })
  },
  destroy (slug) {
    return ApiService.delete(`articles/${slug}`)
  }
}

export const CommentsService = {
  get (slug) {
    if (typeof slug !== 'string') {
      throw new Error(
        '[RWV] CommentsService.get() article slug required to fetch comments'
      )
    }
    return ApiService.get('articles', `${slug}/comments`)
  },

  post (slug, payload) {
    return ApiService.post(`articles/${slug}/comments`, {
      comment: { body: payload }
    })
  },

  destroy (slug, commentId) {
    return ApiService.delete(`articles/${slug}/comments/${commentId}`)
  }
}

export const FavoriteService = {
  add (slug) {
    return ApiService.post(`articles/${slug}/favorite`)
  },
  remove (slug) {
    return ApiService.delete(`articles/${slug}/favorite`)
  }
}
