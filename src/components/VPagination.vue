<template>
  <nav>
    <ul class="pagination">
      <li
          v-for="page in pages"
          :data-test="`page-link-${page}`"
          :key="page"
          :class="paginationClass(page)"
          @click.prevent="changePage(page)"
      >
        <a class="page-link" href v-text="page"/>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">

import { defineComponent } from 'vue'

export default defineComponent({
  name: 'VPagination',
  props: {
    pages: {
      type: Array,
      required: true
    },
    currentPage: {
      type: Number,
      required: true
    }
  },
  setup(props, context) {
    const changePage = (goToPage: number) => {
      if (goToPage === props.currentPage) return
      context.emit('update:currentPage', goToPage)
    }

    const paginationClass = (page: number) => ({
      'page-item': true,
      active: props.currentPage === page
    })

    return {
      changePage,
      paginationClass
    }
  }
})
</script>
