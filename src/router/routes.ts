import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'home',
    component: () => import('~/views/Home.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('~/views/HomeGlobal.vue')
      },
      {
        path: 'my-feed',
        name: 'home-my-feed',
        component: () => import('~/views/HomeMyFeed.vue')
      },
      {
        path: 'tag/:tag',
        name: 'home-tag',
        component: () => import('~/views/HomeTag.vue')
      }
    ],
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('~/views/Login.vue')
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('~/views/Register.vue')
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('~/views/Settings.vue')
  },
  // Handle child routes with a default, by giving the name to the
  // child.
  // SO: https://github.com/vuejs/vue-router/issues/777
  {
    path: '/@:username',
    component: () => import('~/views/Profile.vue'),
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: () => import('~/views/ProfileArticles.vue')
      },
      {
        name: 'profile-favorites',
        path: 'favorites',
        component: () => import('~/views/ProfileFavorited.vue')
      }
    ]
  },
  {
    name: 'article',
    path: '/articles/:slug',
    component: () => import('~/views/Article.vue'),
    props: true
  },
  {
    name: 'article-edit',
    path: '/editor/:slug?',
    props: true,
    component: () => import('~/views/ArticleEdit.vue')
  }
]
export default routes
