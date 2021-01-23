<template>
  <div id="app">
    <Header/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Footer from '~/components/Footer.vue'
import Header from '~/components/Header.vue'

export default defineComponent({
  name: 'App',
  components: {
    Header,
    Footer
  }
})
</script>

<style>

</style>
