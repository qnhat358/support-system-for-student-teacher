import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes';
import { registerGuard } from './guard';

const router = createRouter({
  history: createWebHistory(process.env.VITE_BASE_URL),
  routes: routes
});

// registerGuard(router);

export default router
