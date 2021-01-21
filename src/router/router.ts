const routes = [{
  path: '/',
  component: () => import('layouts/MainLayout.vue'),
  children: [
    {
      path: '',
      component: () => import('pages/HomeGlobal.vue')
    }
  ]
}]
export default routes
