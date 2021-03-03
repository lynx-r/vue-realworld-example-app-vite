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
import { defineComponent, PropType } from 'vue'
import { Tag } from '~/components/models'

export default defineComponent({
  name: 'TagList',
  props: {
    tags: Array as PropType<Tag[]>
  },
})
</script>
