<script setup>
import { IconExternalLink } from '@tabler/icons-vue';
import { RouterLink } from 'vue-router';
import Logo from './components/icons/Logo.vue';
</script>

<template>
  <div class="">
    <header class="mb-6">
      <div class="navbar bg-base-100 shadow-sm">
        <div class="flex-1">
          <RouterLink to="/" class="btn btn-ghost text-xl">
            <Logo class="h-8 -mt-1 mr-1" />
            Loftia | Fansite
          </RouterLink>
        </div>
        <div class="flex-none">
          <ul class="menu menu-horizontal px-1">
            <li>
              <a href="https://loftia.gg" target="_blank" rel="nofollow">
                Official <IconExternalLink class="size-4" />
              </a>
            </li>
            <li>
              <a href="https://loftiacodex.com" target="_blank" rel="nofollow">
                Codex <IconExternalLink class="size-4" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </header>
    <main class="container mx-auto px-4">
      <RouterView />
    </main>
    <footer class="text-sm container mx-auto text-center my-8">
      All logos, trademarks and images on this website are the property of Qloud Games.
      <br />This website is not affiliated with the publisher or developer. <br />Designed by
      <a href="https://thoanny.fr" target="_blank" rel="author" class="link">Thoanny</a> •
      <a
        ref="https://api.thoanny.fr/legal-notice"
        target="_blank"
        rel="terms-of-service"
        class="link"
        >Legal notices</a
      >
    </footer>
  </div>
</template>

<style scoped></style>
