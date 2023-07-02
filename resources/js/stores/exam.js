import { defineStore } from 'pinia'
import http from '../services/http'
import { useLoaderStore } from "@/stores/loader";

import { CREATE_EXAM_URL, EXAM_BY_USERID_URL, EXAM_DETAIL_BY_ID_URL, EXAM_BY_ID_URL, QUESTION_BY_EXAM_ID_URL, JOIN_EXAM_URL, SUBMIT_EXAM_URL, EXAM_PUBLIC_URL, STATISTICAL_URL, UPDATE_EXAM_URL } from '../services/apiUrls'
export const useExamStore = defineStore('exam', {
  state: () => ({
    exam: {
      id: '',
      grade: '',
      name: '',
      topic: '',
      duration: '',
      visibility: 'public',
      date: '',
      start: '',
      end: '',
      questions: [
      ]
    },
    exams: [],
    result: {},
    dataStatistical: [],
  }),
  getters: {
    getTotalPoints: (state) => {
      return state.exam.questions?.reduce((sum, question) => sum + +question.point, 0);
    },
    getExamsByTopic: (state) => {
      let examsByTopic = [];
      for (let exam of state.exams) {
        let topic = exam.topic;
        let topicIndex = examsByTopic.findIndex((item) => item.topic === topic);
        if (topicIndex !== -1) {
          examsByTopic[topicIndex].exams.push(exam);
        } else {
          examsByTopic.push({ topic: topic, exams: [exam] });
        }
      }
      examsByTopic.sort((a, b) => (a.topic > b.topic ? 1 : -1));
      return examsByTopic;
    },
    getStatistical: (state) => {
      const chartData = state.dataStatistical.map(item => {
        const total = parseInt(item.true_count) + parseInt(item.false_count);
        const percentage = (parseInt(item.true_count) / total) * 100;
        return {
          ...item,
          question_id: item.question_id,
          total: total,
          percentage: Math.round(percentage * 10) / 10
        };
      });
      return {
        labels: chartData.map((question,index)=> `Question ${index+1} (${question.true_count}/${question.total})`),
        data: chartData.map((question)=> question.percentage)
      }
    }
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

    async updateExam () {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        const { id, ...others } = this.exam;
        await http.put(
          `${UPDATE_EXAM_URL}`.replace(":id", this.exam.id), { ...others, totalPoint: this.getTotalPoints }
        );
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
    async fetchPublicExams () {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        const response = await http.get(
          `${EXAM_PUBLIC_URL}`
        );
        this.exams = [];
        this.exams = response.data.data;
      } catch (err) {
        console.log(err);
      }
      finally { setLoadingModal(false); }
    },
    async fetchExamDetailById (id, needLoad = true) {
      const { setLoadingModal } = useLoaderStore();
      if (needLoad) {
        setLoadingModal(true);
      }
      try {
        const response = await http.get(
          `${EXAM_DETAIL_BY_ID_URL}`.replace(":id", id)
        );
        this.exam = response.data.data;
      } catch (err) {
        console.log(err);
      }
      finally {
        if (needLoad) {
          setLoadingModal(false);
        }
      }
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
      finally {
        setLoadingModal(false);
      }
    },
    async fetchQuestionByExamId (id) {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        const response = await http.get(
          `${QUESTION_BY_EXAM_ID_URL}`.replace(":id", id)
        );
        this.exam.questions = response.data.data;
      } catch (err) {
        console.log(err);
      }
      finally { setLoadingModal(false); }
    },

    async fetchStatistical (id) {
      const { setLoadingModal } = useLoaderStore();
      setLoadingModal(true);
      try {
        const response = await http.get(
          `${STATISTICAL_URL}`.replace(":id", id)
        );
        this.dataStatistical = response.data.data;
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