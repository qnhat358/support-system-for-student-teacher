import { defineStore } from 'pinia'
import http from '../services/http'
import { useLoaderStore } from "@/stores/loader";

import { CREATE_EXAM_URL, EXAM_BY_USERID_URL, EXAM_DETAIL_BY_ID_URL, EXAM_BY_ID_URL, QUESTION_BY_EXAM_ID_URL, JOIN_EXAM_URL, SUBMIT_EXAM_URL } from '../services/apiUrls'
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
    result:{},
  }),
  getters: {
    getTotalPoints: (state) => {
      return state.exam.questions?.reduce((sum, question) => sum + +question.point, 0);
    },
  },
  actions: {
    async createExam () {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        const { id, ...others } = this.exam;
        const response = await http.post(
          `${CREATE_EXAM_URL}`, { ...others, totalPoint: this.getTotalPoints }
        );
        this.exam.id = response.data.data.id;
      } catch (err) {
        console.log(err);
      }
        finally { setLoadingModal(false); }
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
        finally { setLoadingModal(false); }
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
      finally { setLoadingModal(false); }
    },
    async fetchExamById (id) {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        const response = await http.get(
          `${EXAM_BY_ID_URL}`.replace(":id", id)
        );
        this.exam = response.data.data;
      } catch (err) {
        console.log(err);
      }
      finally { setLoadingModal(false); }
    },
    async fetchQuestionByExamId (id) {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        const response = await http.get(
          `${QUESTION_BY_EXAM_ID_URL}`.replace(":id", id)
        );
        this.exam.questions= response.data.data;
      } catch (err) {
        console.log(err);
      }
      finally { setLoadingModal(false); }
    },

    async joinExam (id) {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        const response = await http.get(
          `${JOIN_EXAM_URL}`.replace(":id", id)
        );
        return response.data.data;
      } catch (err) {
        console.log(err);
      }
      finally { setLoadingModal(false); }
    },

    async submit () {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        console.log(this.exam);
        const response = await http.post(
          `${SUBMIT_EXAM_URL}`, this.exam
        );
        this.result = response.data.data;
      } catch (err) {
        console.log(err);
      }
      finally { setLoadingModal(false); }
    },
  },
})