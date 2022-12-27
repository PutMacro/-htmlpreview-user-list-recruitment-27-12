<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div>
    <header>
      <h2>{{ this.$route.name }}</h2>
    </header>
    <main class="container content-holder">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
body {
  background: rgb(243, 243, 243);
}

h2 {
  padding: 0 2rem 2rem;
}
</style>
