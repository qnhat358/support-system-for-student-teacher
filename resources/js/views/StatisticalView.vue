<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useExamStore } from "@/stores/exam.js";

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

const { exam, getStatistical } = storeToRefs(useExamStore());
const { fetchExamDetailById, fetchStatistical } = useExamStore();

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const data = ref({});

const options = {
  responsive: true,
  maintainAspectRatio: false,
  scales: {
    y: {
      max: 100,
      min: 0,
      ticks: {
        stepSize: 10
      }
    }
  }
}

const examId = ref('');
const isShowQuestion = ref(false);
const isShowChart = ref(false);
const handleShowQuestion = (async()=>{
  if(examId.value){
    await fetchExamDetailById(examId.value, false);
    isShowQuestion.value = true
  }
})
const handleGetData = async()=>{
  isShowChart.value = false;
  await fetchStatistical(examId.value)
  data.value = {
  labels: getStatistical.value.labels,
  datasets: [
    {
      label: 'Percent of true answer',
      backgroundColor: '#f87979',
      data: getStatistical.value.data
    }
  ]
}
  isShowChart.value = true;
}
</script>

<template>
  <Transition name="incoming-call" enter-active-class="animate__animated animate__slideInRight"
    leave-active-class="animate__animated animate__slideOutRight" class="z-[999]">
    <div v-show="isShowQuestion" class="fixed bg-white w-[400px] border h-[calc(100vh-72px)] right-0">
      <div class="p-2 absolute top-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
          class="w-6 h-6 border rounded-full cursor-pointer" @click="isShowQuestion = false">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div class="w-full grid grid-cols-1 divide-y mt-[30px] h-[calc(100vh-102px)] overflow-auto">
        <div v-for="(question, index) in exam.questions" :key="index" class="pb-4">
          <div class="flex flex-row justify-between items-center">
            <span class="font-bold text-lg">Question {{ index + 1 }}</span>
            <span class="mr-2">{{ question.point }} {{question.point == 1 ?'point' : 'points'}}</span>
          </div>
          <div>
            <p class="text-lg">{{ question.content }}</p>
            <div class="grid grid-cols-1 mt-2 gap-2">
              <div v-for="(answer, index) in question.answers" :key="index" class="flex flex-row gap-2 items-center">
                <svg v-if="answer.isCorrect" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="green" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="red" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>

                {{ answer.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
  <div class="container mx-auto px-4 py-6">
    <div class="mx-auto">
      <div class="flex flex-col min-w-0 break-words bg-white w-full shadow-xl rounded-lg min-h-[80vh] p-4">
        <div>
          Exam ID:
          <input type="text" v-model="examId" class="ml-3 w-[20%] h-7 rounded-md">
          <button
          @click="handleGetData"
            class="w-24 p-1 bg-[var(--primary)] rounded-lg text-white font-bold border border-[var(--primary)] shadow-lg ml-3">OK</button>
          <button @click="handleShowQuestion"
            class="w-40 p-1 bg-[var(--primary)] rounded-lg text-white font-bold border border-[var(--primary)] shadow-lg ml-3">SHOW
            QUESTION</button>
        </div>
        <div class="h-[70vh] mt-2">
          <Bar v-if="isShowChart" :data="data" :options="options" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.animate__animated.animate__slideInRight {
  --animate-duration: 0.5s;
}

.animate__animated.animate__slideOutRight {
  --animate-duration: 0.5s;
}
</style>
