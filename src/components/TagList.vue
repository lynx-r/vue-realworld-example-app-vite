<template>
  <ul class="tag-list">
    <li
        class="tag-default tag-pill tag-outline"
        v-for="(tag, index) of tags"
        :key="index"
    >
      <span v-text="tag"/>
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TagList',
  setup (props: { tags: string[] }) {
    return { ...props }
  }
})
</script>
