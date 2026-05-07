<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="">
    <header class="mb-6">
      <div class="navbar bg-base-100 shadow-sm">
        <RouterLink to="/" class="btn btn-ghost text-xl">Loftia | Fansite</RouterLink>
      </div>
    </header>
    <main class="container mx-auto px-4">
      <RouterView />
    </main>
  </div>
</template>

<style scoped></style>
