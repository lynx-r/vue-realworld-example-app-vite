<template>
  <router-link :to="homeRoute" :class="className" v-text="name"></router-link>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'

interface VTagProps {
  name: string
  className: string
}

export default defineComponent({
  name: 'VTag',
  props: ['name', 'className'],
  setup(props: VTagProps) {
    const {className = 'tag-pill tag-default', name} = props
    const homeRoute = computed(() => ({
      name: 'home-tag',
      params: {tag: name}
    }))
    return {homeRoute, className}
  }
})
</script>
