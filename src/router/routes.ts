const routes = [{
  path: '/',
  component: () => import('~/pages/Home.vue'),
  children: [
    {
      path: '',
      name: 'home',
      component: () => import('~/pages/HomeGlobal.vue')
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
  ]
}]
export default routes
