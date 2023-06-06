<script setup>
import AddQuestionModal from "../components/createExam/AddQuestionModal.vue";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useExamStore } from "@/stores/exam.js";
import { useRouter } from "vue-router";

const { createExam } = useExamStore();
const { exam, getTotalPoints } = storeToRefs(useExamStore());

const router = useRouter();
const isShowModal = ref(false);

const handleClear = () => {
  exam.value.questions = [];
}

const handleSubmit = async () => {
  await createExam();
  router.push({ name: "detailTest" });
}
</script>

<template>
  <AddQuestionModal v-if="isShowModal" @hideModal="isShowModal = false"></AddQuestionModal>
  <div class="container xl:max-w-6xl mx-auto px-4 py-6">
    <div class="w-full rounded-xl bg-white p-4 shadow-md flex flex-col items-center justify-center">
      <h1 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">TEST INFORMATION</h1>
      <div class="flex gap-10 mb-10">
        <div class="font-bold flex justify-between items-center gap-5">
          <label for="grade" class="min-w-fit">Grade:</label>
          <select id="grade" class="h-7 rounded-md p-0 px-3 " placeholder="Select grade" v-model="exam.grade">
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
        <div class="font-bold flex gap-5 items-center">
          <label for="examDate" class="min-w-fit">Name:</label>
          <input id="examDate" type="text" class="w-[90%] h-7 rounded-md" v-model="exam.name" />
        </div>
      </div>
      <div class="flex flex-row w-10/12 gap-14">
        <div class="flex flex-col gap-2 w-1/3">
          <div class="font-semibold flex justify-between items-center">
            <label for="examTopic" class="min-w-fit">Exam topic:</label>
            <select id="examTopic" class="w-[65%] h-7 rounded-md p-0 px-3" v-model="exam.topic">
              <option value="">Choose a topic</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
          <div v-show="exam.visibility == 'private'" class="font-semibold flex justify-between items-center">
            <label for="examDate" class="min-w-fit">Exam date:</label>
            <input id="examDate" type="date" class="w-[65%] h-7 rounded-md" v-model="exam.date" />
          </div>


        </div>
        <div class="flex flex-col gap-2 w-1/3">
          <div class="font-semibold flex justify-between items-center">
            <label for="examDuration" class="min-w-fit">Exam duration:</label>
            <select id="examDuration" class="w-[55%] h-7 rounded-md p-0 px-3" v-model="exam.duration">
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
            <input id="examStart" type="time" class="ml-3 w-[55%] h-7 rounded-md" v-model="exam.start" />
          </div>

        </div>
        <div class="flex flex-col gap-2 w-1/3">
          <div class="font-semibold flex justify-between items-center">
            <label for="examVisibility" class="min-w-fit">Visibility:</label>
            <select id="examVisibility" class="w-[65%] h-7 rounded-md p-0 px-3" v-model="exam.visibility">
              <option value="public">Public</option>
              <option value="private">Private</option>
            </select>
          </div>
          <div v-show="exam.visibility == 'private'" class="font-semibold flex justify-between items-center">
            <label for="examEnd" class="min-w-fit">Exam end:</label>
            <input id="examEnd" type="time" class="ml-3 w-[65%] h-7 rounded-md" v-model="exam.end" />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-10 w-full rounded-xl bg-white p-4 shadow-md flex flex-col justify-center items-center">
      <div class="w-10/12 flex flex-col items-center">
        <div class="w-full flex flex-row justify-between items-center">
          <div class="flex flex-row gap-20">
            <h2 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Questions: {{ exam.questions.length
            }}
            </h2>
            <h2 class="text-xl font-bold tracking-tight text-gray-900 dark:text-white">Total points: {{ getTotalPoints }}
            </h2>
          </div>
          <button
            class="py-2.5 px-5 text-center inline-flex items-center text-sm font-bold text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-50 hover:text-[var(--primary)] focus:z-10 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
            @click="isShowModal = true"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
              stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            New question</button>
        </div>
        <div class="w-full grid grid-cols-1 divide-y">
          <div v-for="(question, index) in exam.questions" :key="index" class="py-4">
            <div class="flex flex-row justify-between items-center">
              <span class="font-bold text-lg">Question {{ index + 1 }}</span>
              <div class="flex items-center gap-2">
                <select id="questionType"
                  class="w-30 h-12 rounded-md p-0 px-3 focus:ring-[var(--second)] focus:border-[var(--second)] border border-gray-200"
                  v-model="question.point">
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
                <button
                  class="border hover:bg-[var(--second)] p-3 rounded-xl text-[var(--second)] hover:text-white transition-colors ease-in-out duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                  </svg>
                </button>
                <button
                  class="border hover:bg-[var(--second)] p-3 rounded-xl text-[var(--second)] hover:text-white transition-colors ease-in-out duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                  </svg>
                </button>
              </div>
            </div>
            <div>
              <p class="text-lg">{{ question.content }}</p>
              <div class="grid grid-cols-2 mt-2">
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
    </div>
    <div class="flex justify-end gap-5 mt-4 pr-10">
      <button class="px-5 bg-white text-[var(--primary)] font-bold rounded-lg border border-[var(--primary)] shadow-lg"
        @click="handleClear">Clear</button>
      <button
        class="w-24 p-2 bg-[var(--primary)] rounded-lg text-white font-bold border border-[var(--primary)] shadow-lg"
        @click="handleSubmit">Submit</button>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
