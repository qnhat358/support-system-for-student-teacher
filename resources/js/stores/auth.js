import { defineStore } from 'pinia'
import http from '../services/http'
import axios from 'axios'
import { useLoaderStore } from "@/stores/loader";
import { notify } from "@kyvg/vue3-notification";

import { LOGIN_URL, REGISTER_URL, LOGOUT_URL, REFRESH_URL } from '../services/apiUrls'



export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: {},
    isAuthenticated: false,
    loginForm: {
      username: '',
      password: '',
    },
    registerForm: {
      username: '',
      password: '',
      type: '',
    },
  }),
  persist: {
    enabled: true,
    strategies: [
      { storage: localStorage, paths: ['user', 'isAuthenticated'] }
    ]
  },
  getters: {
  },
  actions: {
    async login () {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        // axios.defaults.withCredentials = true;
        const response = await axios.post(
          `http://127.0.0.1:3000/api${LOGIN_URL}`, this.loginForm
        );
        localStorage.setItem('accessToken', response.data.data.accessToken);
        this.user = response.data.data.user;
        this.isAuthenticated = true;
        return true;
      } catch (err) {
        if (!err.response) {
          console.log(err);
          return;
        }
        const responseErrors = err.response.data?.errors;
        let errors = [];
        if (!responseErrors || responseErrors.length === 0) {
          errors = [err.response.data.message];
        } else {
          if (responseErrors.constructor  === Array){
            errors = Object.keys(responseErrors).reduce((currentErrors, key) => currentErrors.concat(responseErrors[key]), errors);
          } else errors = [err.response.data.errors]
        }
        errors.forEach(error => {
          notify({
            text: error,
            type: 'error',
          });
        })
        return false;
      }
      finally { setLoadingModal(false); }
    },

    async register () {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        const response = await axios.post(
          `http://127.0.0.1:3000/api${REGISTER_URL}`, this.registerForm
        );
        localStorage.setItem('accessToken', response.data.data.accessToken);
        this.user = response.data.data.user;
        this.isAuthenticated = true;
      } catch (err) {
        if (!err.response) {
          console.log(err);
          return;
        }
        const reponseErrors = err.response.data?.errors;
        let errors = [];
        if (!reponseErrors || reponseErrors.length === 0) {
          errors = [err.response.data.message];
        } else {
          errors = Object.keys(reponseErrors).reduce((currentErrors, key) => currentErrors.concat(reponseErrors[key]), errors);
        }
        errors.forEach(error => {
          notify({
            text: error,
            type: 'error',
          });
        })
        console.log(err);
      }
      finally { setLoadingModal(false); }
    },

    async logout () {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        localStorage.removeItem('accessToken');
        this.isAuthenticated = false;
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          `http://127.0.0.1:3000/api${LOGOUT_URL}`
        );
      } catch (err) {
        console.log(err);
      }
      finally { setLoadingModal(false); }
    },

    async refreshToken () {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        axios.defaults.withCredentials = true;
        const response = await axios.post(
          `http://127.0.0.1:3000/api${REFRESH_URL}`
        );
        this.isAuthenticated = true;
        return response.data.data;
      } catch (err) {
        console.log(err);
      }
      finally { setLoadingModal(false); }
    },
  },
})