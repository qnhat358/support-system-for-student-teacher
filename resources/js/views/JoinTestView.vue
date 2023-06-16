<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useExamStore } from "@/stores/exam.js";
import JoinTestModal from "../components/joinTest/JoinTestModal.vue";
import { useRoute } from "vue-router";
import { toHHMMstring } from "../composables/dateTimeConvert";
import moment from 'moment';
const route = useRoute();
const { exam, result } = storeToRefs(useExamStore());

const { fetchQuestionByExamId } = useExamStore();

const isShowModal = ref(false);
const id = ref('');

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

const openModal = async () => {
  await fetchQuestionByExamId(id.value);
  document.body.style.overflow = 'hidden';
  isShowModal.value = true;
}
const closeModal = () => {
  document.body.style.overflow = '';
  isShowModal.value = false;
}
onMounted(async () => {
  id.value = route.query.id;
  result.value = {};
})
</script>

<template>
  <JoinTestModal v-if="isShowModal" @hideModal="closeModal" :id="id"></JoinTestModal>
  <div class="container xl:max-w-6xl mx-auto px-4 py-6">
    <div class="w-full rounded-xl bg-white p-4 shadow-md flex flex-col items-center justify-center">
      <h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">TEST INFORMATION</h1>
      <div class="mt-8 flex flex-row w-10/12 gap-14">
        <div class="flex flex-col gap-2 w-1/2">
          <div class="font-semibold flex justify-between items-center">
            <label for="examDate" class="min-w-fit">Exam date:</label>
            <input id="examDate" type="date" class="w-[75%] h-7 rounded-md" v-model="exam.date" readonly />
          </div>
          <div class="font-semibold flex justify-between items-center">
            <label for="examTopic" class="min-w-fit">Exam topic:</label>
            <select id="examTopic" class="w-[75%] h-7 rounded-md p-0 px-3" v-model="exam.topic" disabled>
              <option value="" disabled>Choose a topic</option>
              <option v-for="(topic, index) in topicOption" :value="topic.value">{{ topic.option }}</option>
            </select>
          </div>
          <div class="font-semibold flex justify-between items-center">
            <label for="examID" class="min-w-fit">Exam ID:</label>
            <input id="examID" type="number" readonly class="w-[75%] h-7 rounded-md" v-model="exam.id" />
          </div>
        </div>
        <div class="flex flex-col gap-2 w-1/2">
          <div class="font-semibold flex justify-between items-center">
            <label for="examStart" class="min-w-fit">Exam start:</label>
            <input id="examStart" type="time" class="ml-3 w-[75%] h-7 rounded-md" v-model="exam.start" readonly />
          </div>
          <div class="font-semibold flex justify-between items-center">
            <label for="examEnd" class="min-w-fit">Exam end:</label>
            <input id="examEnd" type="time" class="ml-3 w-[75%] h-7 rounded-md" v-model="exam.end" readonly />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10 w-full rounded-xl bg-white p-4 shadow-md flex flex-col justify-center items-center">
      <div class="flex flex-row justify-evenly items-center w-full">
        <div v-if="!Object.keys(result).length">
          <button
            class="px-5 bg-white text-[var(--primary)] font-bold rounded-lg border border-[var(--primary)] shadow-lg"
            @click="openModal">
            Start
          </button>
        </div>
        <div v-else class="relative overflow-x-auto w-full flex flex-col items-center">
          <table class="w-full text-sm text-center font-bold text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Total points
                </th>
                <th scope="col" class="px-6 py-3">
                  True questions
                </th>
                <th scope="col" class="px-6 py-3">
                  Time start
                </th>
                <th scope="col" class="px-6 py-3">
                  Time end
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th class="px-6 py-4">
                  {{ result.total_point }}
                </th>
                <td class="px-6 py-4">
                  {{result.total_question}}
                </td>
                <td class="px-6 py-4">
                  {{moment(result.time_start).format('DD/MM/YYYY - HH:mm:ss')}}
                </td>
                <td class="px-6 py-4">
                  {{moment(result.time_end).format('DD/MM/YYYY - HH:mm:ss')}}
                </td>
              </tr>
            </tbody>
          </table>
          <button
            class="px-5 py-2 mt-10 mr-10 self-end bg-white text-[var(--primary)] font-bold rounded-lg border border-[var(--primary)] shadow-lg"
            @click="goHome">
            Go Home
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
