import { useAuthStore } from "@/stores/auth";
import { useUserStore } from '@/stores/user'
import { storeToRefs } from "pinia";
import jwtDecode from 'jwt-decode'
export function registerGuard (router) {
  router.beforeEach(async (to, from, next) => {
    if (to.name !== 'loginRegister' && to.name !== 'landing') {
      const { isAuthenticated } = storeToRefs(useAuthStore());
      if (!isAuthenticated.value) {
        const accessToken = localStorage.getItem('accessToken');
        const id = jwtDecode(accessToken)?.UserId;
        next({ name: 'loginRegister' });
      } else {
        next();
      }
    } else {
      next();
    }
  });
}
