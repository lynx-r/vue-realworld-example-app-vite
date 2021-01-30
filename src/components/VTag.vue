<template>
  <router-link :to="homeRoute" :class="className" v-text="name"></router-link>
</template>

<script lang="ts">
import { computed, defineComponent, toRefs } from 'vue'

interface VTagProps {
  name: string
  className: string
}

export default defineComponent({
  name: 'VTag',
  props: ['name', 'className'],
  setup(props: VTagProps) {
    const {className = 'tag-pill tag-default', name} = toRefs(props)
    const homeRoute = computed(() => ({
      name: 'home-tag',
      params: {tag: name.value}
    }))
    return {homeRoute, className}
  }
})
</script>
