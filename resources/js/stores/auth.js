import { defineStore } from 'pinia'
import http from '../services/http'
import axios from 'axios'
import { useLoaderStore } from "@/stores/loader";

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
      { storage: localStorage }
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
      } catch (err) {
        console.log(err);
      }
      setTimeout(() => {
        setLoadingModal(false);
      }, 1000)
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
        console.log(err);
      }
      setTimeout(() => {
        setLoadingModal(false);
      }, 1000)
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
      setTimeout(() => {
        setLoadingModal(false);
      }, 1000)
    },

    async refreshToken () {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        // axios.defaults.withCredentials = true;
        const response = await axios.post(
          `http://127.0.0.1:3000/api${REFRESH_URL}`
        );
        this.isAuthenticated = true;
        return response.data.data;
      } catch (err) {
        console.log(err);
      }
      setTimeout(() => {
        setLoadingModal(false);
      }, 1000)
    },
  },
})