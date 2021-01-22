<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign in</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'register' }">
              Need an account?
            </router-link>
          </p>
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ v | error }}</li>
          </ul>
          <form @submit.prevent="onSubmit(email, password)">
            <fieldset class="form-group">
              <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="email"
                  placeholder="Email"
              />
            </fieldset>
            <fieldset class="form-group">
              <input
                  class="form-control form-control-lg"
                  type="password"
                  v-model="password"
                  placeholder="Password"
              />
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { LOGIN } from '~/store/actions.type'

export default defineComponent({
  name: 'RwvLogin',
  setup() {
    const store = useStore()
    const router = useRouter()

    const email = ref('')
    const password = ref('')

    function onSubmit(email, password) {
      store
          .dispatch(LOGIN, {email: email.value, password: password.value})
          .then(() => router.push({name: 'home'}))
    }

    const errors = computed(() => store.state.errors)

    return {
      email,
      password,
      onSubmit,
      errors
    }
  }
})
</script>
