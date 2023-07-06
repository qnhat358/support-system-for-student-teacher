<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useExamStore } from "@/stores/exam.js";
import { useRoute } from "vue-router";
import { exportHtmlAsPdf } from "../plugins/pdf";

const { exam } = storeToRefs(useExamStore());
const { fetchExamDetailById } = useExamStore();

const route = useRoute();
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
const answerHeader = ['A', 'B', 'C', 'D', 'E']
function exportAsPdf () {
  let element = document.getElementById('pdf-content-container');
  let fileName = exam.value.name.replace(/\s/g, "") + '.pdf';
  exportHtmlAsPdf(element, fileName, 0);
}
onMounted(async()=>{
  let id = route.query.id;
  await fetchExamDetailById(id);
})
</script>

<template>
  <div class="container xl:max-w-6xl mx-auto px-4 py-6">
    <div class="w-full rounded-xl bg-white p-4 shadow-md flex flex-col items-center justify-center"
      id="pdf-content-container">
      <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">TEST INFORMATION</h1>
      <div class="flex mt-5 justify-between w-8/12">
        <div>
          <div class="font-semibold flex justify-between items-center gap-5">
            Grade: {{ exam.grade }}
          </div>
          <div class="font-semibold flex justify-between items-center">
            Exam topic: {{ exam.topic.charAt(0).toUpperCase() + exam.topic.slice(1) }}
          </div>
        </div>
        <div>
          <div class="font-semibold flex gap-5 items-center">
            Name: {{ exam.name }}
          </div>
          <div class="font-semibold flex justify-between items-center">
            Exam duration: {{ exam.duration + ' minutes' }}
          </div>
        </div>
      </div>

      <div class="w-11/12 flex flex-col items-center border px-10 mt-10">
        <div class="w-full grid grid-cols-1 divide-y">
          <div v-for="(question, index) in exam.questions" :key="index" class="py-4">
            <div class="flex flex-row justify-between items-center">
              <span class="font-bold text-lg">Question {{ index + 1 }}</span>
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

                  {{ answerHeader[index] + '. ' + answer.content }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-end gap-5 mt-4 pr-10 items-center">
      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" class="sr-only peer" @click="isShowCorrectAnswer = !isShowCorrectAnswer"
          v-show="!isExport">
        <div
          class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
        </div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Show/Hide Correct
          Answer</span>
      </label>
      <button
        class="w-24 p-2 bg-[var(--primary)] rounded-lg text-white font-bold border border-[var(--primary)] shadow-lg"
        @click="exportAsPdf">Export</button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
