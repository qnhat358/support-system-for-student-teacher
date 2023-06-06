import { defineStore } from 'pinia'
import http from '../services/http'
import { useLoaderStore } from "@/stores/loader";

import { QUESTION_URL } from '../services/apiUrls'
export const useQuestionStore = defineStore('question', {
  state: () => ({
    questions: [],
  }),
  getters: {
  },
  actions: {
    async fetchQuestionList () {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        const response = await http.get(
          `${QUESTION_URL}`
        );
        this.questions = response.data.data;
      } catch (err) {
        console.log(err);
      }
      setTimeout(() => {
        setLoadingModal(false);
      }, 1000)
    },
  },
})