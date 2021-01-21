const routes = [{
  path: '/',
  component: () => import('~/layouts/MainLayout.vue'),
  children: [
    {
      path: '',
      component: () => import('~/pages/HomeGlobal.vue')
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
