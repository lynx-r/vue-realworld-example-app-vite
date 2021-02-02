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

import { defineComponent, toRefs } from 'vue'

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
    const {
      currentPage,
      pages
    } = toRefs(props)

    const changePage = (goToPage: number) => {
      if (goToPage === currentPage.value) return
      context.emit('update:currentPage', goToPage)
    }

    const paginationClass = (page: number) => ({
      'page-item': true,
      active: currentPage.value === page
    })

    return {
      pages,
      changePage,
      paginationClass
    }
  }
})
</script>
