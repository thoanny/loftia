import BundlesView from '@/views/BundlesView.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BundlesView,
    },
  ],
});

export default router;
