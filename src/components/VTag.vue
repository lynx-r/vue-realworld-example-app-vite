<template>
  <router-link :to="homeRoute" :class="className" v-text="name"></router-link>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'

export default defineComponent({
  name: 'VTag',
  props: {
    name: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: 'tag-pill tag-default'
    }
  },
  setup(props) {
    const {className, name} = toRefs(props)
    const homeRoute = computed(() => ({
      name: 'home-tag',
      params: {tag: name.value}
    }))
    return {homeRoute, className}
  }
})
</script>
