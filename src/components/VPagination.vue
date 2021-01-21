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

interface VPaginationProps {
  pages: number[]
  currentPage: number
}

export default defineComponent({
  name: 'VPagination',
  setup(props: VPaginationProps, context) {
    const {
      currentPage,
      pages
    } = props

    function changePage(goToPage: number) {
      if (goToPage === currentPage) return
      context.emit('update:currentPage', goToPage)
    }

    function paginationClass(page: number) {
      return {
        'page-item': true,
        active: currentPage === page
      }
    }

    return {
      pages,
      changePage,
      paginationClass
    }
  }
})
</script>
