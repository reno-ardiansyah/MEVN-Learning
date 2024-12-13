import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import Home from '@/components/pages/Home.vue';
import Hobbies from '@/components/pages/Hobbies.vue';
import People from '@/components/pages/People.vue';
import PhoneNumber from '@/components/pages/PhoneNumber.vue';
import Login from '@/components/pages/auth/login.vue';
import Profile from '@/components/pages/auth/profile.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', name: 'Home', component: Home },
  { path: '/hobbies', name: 'Hobbies', component: Hobbies },
  { path: '/people', name: 'People', component: People },
  { path: '/phone-number', name: 'PhoneNumber', component: PhoneNumber },
  { path: '/auth/login', name: 'login', component: Login},
  { path: '/account/edit', name: 'profile', component: Profile},
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
});

export default router;
