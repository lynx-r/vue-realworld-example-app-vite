import { createApp } from 'vue'
import { AuthActionTypes } from '~/store/auth/auth-action-types'
import App from './App.vue'
import router from './router'
import { useStore } from './store'

const store = useStore()

// Ensure we checked auth before each page load.
router.beforeEach(async (to, from, next) => {
  await store.dispatch(AuthActionTypes.CHECK_AUTH)
  next()
})

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
