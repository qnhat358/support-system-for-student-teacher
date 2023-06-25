import { defineStore } from 'pinia'
import http from '../services/http'
import axios from 'axios'
import { useLoaderStore } from "@/stores/loader";

import { CHAT_URL} from '../services/apiUrls'



export const useChatStore = defineStore('chat', {
  state: () => ({
  }),
  getters: {
  },
  actions: {
    async getRoomId (roomName) {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        // axios.defaults.withCredentials = true;
        const response = await http.post(
          `${CHAT_URL}/roomId`, {roomName}
        );
        return response.data.data;
      } catch (err) {
        console.log(err);
      }
      finally { setLoadingModal(false); }
    },
    async getAllUsersHaveChatted () {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        // axios.defaults.withCredentials = true;
        const response = await http.get(
          `${CHAT_URL}/users`
        );
        return response.data.data;
      } catch (err) {
        console.log(err);
      }
      finally { setLoadingModal(false); }
    },
  },
})