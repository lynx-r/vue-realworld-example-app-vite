<template>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

interface <%= name.pascalCase %>Props {
}

export default defineComponent({
  name: '<%= name.pascalCase %>',
  props: [],
  setup(props: <%= name.pascalCase %>) {
    const {} = props

    return {}
  }
})
</script>
<% if (scoped) { %>
<style scoped>
<% } else { %>
<style>
<% } %>
</style>
