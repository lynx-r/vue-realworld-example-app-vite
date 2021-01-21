<template>
  <div>
    <div>Header</div>
    <div>
      <router-view/>
    </div>
    <div>Footer</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout'
});
</script>

<style scoped>

</style>
