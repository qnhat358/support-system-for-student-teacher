import { defineStore } from 'pinia'
import http from '../services/http'
import { useLoaderStore } from "@/stores/loader";

import { CREATE_EXAM_URL, EXAM_BY_USERID_URL, EXAM_DETAIL_BY_ID_URL } from '../services/apiUrls'
export const useExamStore = defineStore('exam', {
  state: () => ({
    exam: {
      id: '',
      grade: 1,
      name: '',
      topic: '',
      duration: '5',
      visibility: 'public',
      date: '',
      start: '',
      end: '',
      questions: [
        // {
        //   id: '',
        //   type: '',
        //   point: '',
        //   content: '',
        //   answers: [
        //     {
        //       id: '',
        //       content: '',
        //       isCorrect: false,
        //     },
        //   ]
        // },
      ]
    },
    exams: [],
  }),
  getters: {
    getTotalPoints: (state) => {
      return state.exam.questions.reduce((sum, question) => sum + +question.point, 0);
    },
  },
  actions: {
    async createExam () {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        const response = await http.post(
          `${CREATE_EXAM_URL}`, { ...this.exam, totalPoint: this.getTotalPoints }
        );
        this.exam.id = response.data.data.id;
      } catch (err) {
        console.log(err);
      }
      setTimeout(() => {
        setLoadingModal(false);
      }, 1000)
    },
    async fetchExamsByUserId (id) {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        const response = await http.get(
          `${EXAM_BY_USERID_URL}`.replace(":id", id)
        );
        this.exams = response.data.data;
      } catch (err) {
        console.log(err);
      }
      setTimeout(() => {
        setLoadingModal(false);
      }, 1000)
    },
    async fetchExamDetailById (id) {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        const response = await http.get(
          `${EXAM_DETAIL_BY_ID_URL}`.replace(":id", id)
        );
        this.exam = response.data.data;
      } catch (err) {
        console.log(err);
      }
      setTimeout(() => {
        setLoadingModal(false);
      }, 1000)
    },
  },
})