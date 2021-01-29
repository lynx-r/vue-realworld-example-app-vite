<template v-show="errors">
  <ul class="error-messages">
    <li v-for="(value, key) in errors" :key="key">
      <span v-text="key" />&nbsp;
      <span v-for="err in value" :key="err" v-text="err" />
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent, toRef } from 'vue'

export default defineComponent({
  name: "ListErorrs",
  props: {
    errors: { type: Object, required: true }
  },
  setup(props) {
    const errors = toRef(props, 'errors')
    return {errors}
  }
})
</script>
