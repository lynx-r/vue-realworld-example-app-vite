import { createApp } from 'vue'
import { CHECK_AUTH } from '~/store/actions.type'
import App from './App.vue'
import router from './router'
import { useStore } from './store'

const store = useStore()

// Ensure we checked auth before each page load.
router.beforeEach(async (to, from, next) => {
  await store.dispatch(CHECK_AUTH)
  next()
})

createApp(App)
  .use(store)
  .use(router)
  .mount('#app')
