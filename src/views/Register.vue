<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">
        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Sign up</h1>
          <p class="text-xs-center">
            <router-link :to="{ name: 'login' }">
              Have an account?
            </router-link>
          </p>
          <ul v-if="errors" class="error-messages">
            <li v-for="(v, k) in errors" :key="k">{{ k }} {{ error(v) }}</li>
          </ul>
          <form @submit.prevent="onSubmit">
            <fieldset class="form-group">
              <input
                  class="form-control form-control-lg"
                  type="text"
                  v-model="username"
                  placeholder="Username"
              />
            </fieldset>
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
              Sign up
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
import error from '~/common/error.filter'
import { useStore } from '~/store'
import { AuthActionTypes } from '~/store/auth/auth-action-types'

export default defineComponent({
  name: 'Register',
  setup() {
    const store = useStore()
    const router = useRouter()

    const username = ref('')
    const email = ref('')
    const password = ref('')

    const errors = computed(() => store.state.auth.errors)

    const onSubmit = () => {
      store
          .dispatch(AuthActionTypes.REGISTER,
              {email: email.value, username: username.value, password: password.value})
          .then(() => router.push({name: 'home'}))
    }

    return {
      email,
      password,
      username,
      errors,
      onSubmit,
      error
    }
  }
})
</script>
