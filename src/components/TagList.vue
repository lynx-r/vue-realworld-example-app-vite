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

interface TagListProps {
  tags: string[]
}

export default defineComponent({
  name: 'TagList',
  props: ['tags'],
  setup(props: TagListProps) {
    return {...props}
  }
})
</script>
