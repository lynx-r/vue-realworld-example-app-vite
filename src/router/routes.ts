import { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: 'home',
    component: () => import('~/pages/Home.vue'),
    children: [
      {
        path: 'home',
        name: 'home',
        component: () => import('~/pages/HomeGlobal.vue')
      },
      {
        path: 'my-feed',
        name: 'home-my-feed',
        component: () => import('~/pages/HomeMyFeed.vue')
      },
      {
        path: 'tag/:tag',
        name: 'home-tag',
        component: () => import('~/pages/HomeTag.vue')
      },
      {
        name: 'profile',
        path: 'profile',
        component: () => import('~/pages/HomeGlobal.vue')
      },
      {
        name: 'article',
        path: 'article',
        component: () => import('~/pages/HomeGlobal.vue')
      }
    ],
  },
  {
    name: 'login',
    path: '/login',
    component: () => import('~/pages/Login.vue')
  },
  {
    name: 'register',
    path: '/register',
    component: () => import('~/pages/Register.vue')
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('~/pages/Register.vue')
  },
  {
    name: 'article-edit',
    path: '/editor/:slug?',
    props: true,
    component: () => import('~/pages/Register.vue')
  }
]
export default routes
