<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useExamStore } from "@/stores/exam.js";
import { exportHtmlAsPdf } from "../plugins/pdf";

const { exam, getTotalPoints } = storeToRefs(useExamStore());

const isShowCorrectAnswer = ref(false);
const isExport = ref(false);

const topicOption = [
  {
    option: 'Mathematics',
    value: 'mathematics',
  },
  {
    option: 'Literature',
    value: 'literature',
  },
  {
    option: 'History',
    value: 'history',
  },
  {
    option: 'Physics',
    value: 'physics',
  },
  {
    option: 'Chemistry',
    value: 'chemistry',
  },
  {
    option: 'English',
    value: 'english',
  },
  {
    option: 'Informatics',
    value: 'informatics',
  },
  {
    option: 'Biology',
    value: 'biology',
  },
]

function exportAsPdf() {
  let element = document.getElementById('pdf-content-container');
  exportHtmlAsPdf(element, 'test.pdf', 0);
}
</script>

<template>
  <div class="container xl:max-w-6xl mx-auto px-4 py-6">
    <div class="w-full rounded-xl bg-white p-4 shadow-md flex flex-col items-center justify-center">
      <h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">TEST INFORMATION</h1>
      <div class="flex gap-10 mb-10 justify-center">
        <div class="font-bold flex gap-5 items-center">
          <label for="examDate" class="min-w-fit">ID:</label>
          <input id="examDate" type="text" class="h-7 rounded-md w-10" v-model="exam.id" readonly />
        </div>
        <div class="font-bold flex justify-between items-center gap-5">
          <label for="grade" class="min-w-fit">Grade:</label>
          <select id="grade" class="h-7 rounded-md p-0 px-3 " placeholder="Select grade" v-model="exam.grade" disabled>
            <option value="1">1st</option>
            <option value="2">2nd</option>
            <option value="3">3rd</option>
            <option value="4">4th</option>
            <option value="5">5th</option>
            <option value="6">6th</option>
            <option value="7">7th</option>
            <option value="8">8th</option>
            <option value="9">9th</option>
            <option value="10">10th</option>
            <option value="11">11th</option>
            <option value="12">12th</option>
          </select>
        </div>
        <div class="font-bold flex gap-5 items-center grow">
          <label for="examDate" class="min-w-fit">Name:</label>
          <input id="examDate" type="text" class="h-7 rounded-md overflow-hidden" v-model="exam.name" readonly />
        </div>
      </div>
      <div class="flex flex-row w-10/12 gap-14">
        <div class="flex flex-col gap-2 w-1/3">
          <div class="font-semibold flex justify-between items-center">
            <label for="examTopic" class="min-w-fit">Exam topic:</label>
            <select id="examTopic" class="w-[65%] h-7 rounded-md p-0 px-3" v-model="exam.topic" disabled>
              <option value="" disabled>Choose a topic</option>
              <option v-for="(topic, index) in topicOption" :value="topic.value">{{ topic.option }}</option>
            </select>
          </div>
          <div v-show="exam.visibility == 'private'" class="font-semibold flex justify-between items-center">
            <label for="examDate" class="min-w-fit">Exam date:</label>
            <input id="examDate" type="date" class="w-[65%] h-7 rounded-md" v-model="exam.date" readonly />
          </div>


        </div>
        <div class="flex flex-col gap-2 w-1/3">
          <div class="font-semibold flex justify-between items-center">
            <label for="examDuration" class="min-w-fit">Exam duration:</label>
            <select id="examDuration" class="w-[55%] h-7 rounded-md p-0 px-3" v-model="exam.duration" disabled>
              <option value="5">5 minutes</option>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="45">45 minutes</option>
              <option value="60">60 minutes</option>
              <option value="90">90 minutes</option>
              <option value="120">120 minutes</option>
            </select>
          </div>
          <div v-show="exam.visibility == 'private'" class="font-semibold flex justify-between items-center">
            <label for="examStart" class="min-w-fit">Exam start:</label>
            <input id="examStart" type="time" class="ml-3 w-[55%] h-7 rounded-md" v-model="exam.start" readonly />
          </div>

        </div>
        <div class="flex flex-col gap-2 w-1/3">
          <div class="font-semibold flex justify-between items-center">
            <label for="examVisibility" class="min-w-fit">Visibility:</label>
            <select id="examVisibility" class="w-[65%] h-7 rounded-md p-0 px-3" v-model="exam.visibility" disabled>
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div v-show="exam.visibility == 'private'" class="font-semibold flex justify-between items-center">
            <label for="examEnd" class="min-w-fit">Exam end:</label>
            <input id="examEnd" type="time" class="ml-3 w-[65%] h-7 rounded-md" v-model="exam.end" readonly />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10 w-full rounded-xl bg-white p-4 shadow-md flex flex-col justify-center items-center" id="pdf-content-container">
      <div class="w-10/12 flex flex-col items-center">
        <div class="w-full flex flex-row justify-between items-center">
          <div class="flex flex-row gap-20">
            <h2 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Questions: {{ exam.questions.length
            }}
            </h2>
            <h2 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Total points: {{ getTotalPoints }}
            </h2>
          </div>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" class="sr-only peer" @click="isShowCorrectAnswer = !isShowCorrectAnswer" v-show="!isExport">
            <div
              class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
            </div>
            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Show/Hide Correct
              Answer</span>
          </label>
        </div>
        <div class="w-full grid grid-cols-1 divide-y">
          <div v-for="(question, index) in exam.questions" :key="index" class="py-4">
            <div class="flex flex-row justify-between items-center">
              <span class="font-bold text-lg">Question {{ index + 1 }}</span>
              <div class="flex items-center gap-2">
                <select id="questionType"
                  class="w-30 h-12 rounded-md p-0 px-3 focus:ring-[var(--second)] focus:border-[var(--second)] border border-gray-200"
                  disabled v-model="question.point">
                  <option value="1">1 point</option>
                  <option value="2">2 points</option>
                  <option value="3">3 points</option>
                  <option value="4">4 points</option>
                  <option value="5">5 points</option>
                  <option value="6">6 points</option>
                  <option value="7">7 points</option>
                  <option value="8">8 points</option>
                  <option value="9">9 points</option>
                  <option value="10">10 points</option>
                </select>
              </div>
            </div>
            <div>
              <p class="text-lg">{{ question.content }}</p>
              <div class="grid grid-cols-2 mt-2">
                <div v-for="(answer, index) in question.answers" :key="index" class="flex flex-row gap-2 items-center">
                  <svg v-if="answer.isCorrect" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke-width="1.5" stroke="green" class="w-6 h-6" :class="{ 'invisible': !isShowCorrectAnswer }">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="red" class="w-6 h-6" :class="{ 'invisible': !isShowCorrectAnswer }">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>

                  {{ answer.content }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-5 mt-4 pr-10">
      <button
        class="px-5 bg-white text-[var(--primary)] font-bold rounded-lg border border-[var(--primary)] shadow-lg">Edit</button>
      <router-link :to="{ name: 'exportTest', query: { id } }"
        class="w-24 p-2 bg-[var(--primary)] rounded-lg text-white font-bold border border-[var(--primary)] shadow-lg text-center" >Export</router-link>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
