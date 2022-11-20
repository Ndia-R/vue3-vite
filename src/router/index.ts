import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/home',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/sign-up',
      name: 'signUp',
      component: () => import('../views/SignUpView.vue'),
    },
    {
      path: '/sign-in',
      name: 'signIn',
      component: () => import('../views/SignInView.vue'),
    },
  ],
});

export default router;
