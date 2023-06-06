<script setup>
import JoinTestModal from "../components/joinTest/JoinTestModal.vue";
import { ref } from "vue";

const isShowModal = ref(false);
const testInfo = ref({
  date: '2023-05-22',
  topic: 'US',
  id: '12412',
  start: '14:00',
  end: '14:30',
})
const questions = ref([
  {
    question: 'What is my name ?',
    point: 1,
    answers: [
      {
        answer: 'Nhat',
        isCorrect: true,
      },
      {
        answer: 'Trung',
        isCorrect: false,
      },
      {
        answer: 'Heo',
        isCorrect: false,
      },
      {
        answer: 'Cuong',
        isCorrect: false,
      },
    ]
  },
  {
    question: 'What is my name ?',
    point: 2,
    answers: [
      {
        answer: 'Nhat',
        isCorrect: true,
      },
      {
        answer: 'Trung',
        isCorrect: false,
      },
      {
        answer: 'Heo',
        isCorrect: false,
      },
      {
        answer: 'Cuong',
        isCorrect: false,
      },
    ]
  },
])

const openModal = () => {
  document.body.style.overflow = 'hidden';
  isShowModal.value = true;
}
const closeModal = () => {
  document.body.style.overflow = '';
  isShowModal.value = false;
}
</script>

<template>
  <JoinTestModal v-show="isShowModal" @hideModal="closeModal"></JoinTestModal>
  <div class="container xl:max-w-6xl mx-auto px-4 py-6">
    <div class="w-full rounded-xl bg-white p-4 shadow-md flex flex-col items-center justify-center">
      <h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">TEST INFORMATION</h1>
      <div class="mt-8 flex flex-row w-10/12 gap-14">
        <div class="flex flex-col gap-2 w-1/2">
          <div class="font-semibold flex justify-between items-center">
            <label for="examDate" class="min-w-fit">Exam date:</label>
            <input id="examDate" type="date" class="w-[75%] h-7 rounded-md" v-model="testInfo.date" readonly />
          </div>
          <div class="font-semibold flex justify-between items-center">
            <label for="examTopic" class="min-w-fit">Exam topic:</label>
            <select id="examTopic" class="w-[75%] h-7 rounded-md p-0 px-3" v-model="testInfo.topic" disabled>
              <option vaalue="">Choose a topic</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div class="font-semibold flex justify-between items-center">
            <label for="examID" class="min-w-fit">Exam ID:</label>
            <input id="examID" type="number" readonly class="w-[75%] h-7 rounded-md" v-model="testInfo.id" />
          </div>
        </div>
        <div class="flex flex-col gap-2 w-1/2">
          <div class="font-semibold flex justify-between items-center">
            <label for="examStart" class="min-w-fit">Exam start:</label>
            <input id="examStart" type="time" class="ml-3 w-[75%] h-7 rounded-md" v-model="testInfo.start" readonly />
          </div>
          <div class="font-semibold flex justify-between items-center">
            <label for="examEnd" class="min-w-fit">Exam end:</label>
            <input id="examEnd" type="time" class="ml-3 w-[75%] h-7 rounded-md" v-model="testInfo.end" readonly />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10 w-full rounded-xl bg-white p-4 shadow-md flex flex-col justify-center items-center">
      <div class="w-10/12 flex flex-row justify-evenly items-center">
        <div>
          <h2 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Total questions: {{ questions.length
          }}
          </h2>
        </div>
        <div>
          <button
            class="px-5 bg-white text-[var(--primary)] font-bold rounded-lg border border-[var(--primary)] shadow-lg"
            @click="openModal">
            Start
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
