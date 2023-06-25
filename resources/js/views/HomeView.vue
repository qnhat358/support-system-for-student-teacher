<script setup>
import { storeToRefs } from "pinia";
import { useExamStore } from "../stores/exam";
import { useAuthStore } from "../stores/auth";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useNotification } from "@kyvg/vue3-notification";
const { notify }  = useNotification()
const router = useRouter();

const { exam } = storeToRefs(useExamStore());
const { joinExam } = useExamStore();
const { user } = storeToRefs(useAuthStore());

const examCode = ref('');
const videoCode = ref('');

const handleJoinExam = async () => {
  const isJoin = await joinExam(examCode.value);
  if (isJoin) {
    router.push({ name: "waitingRoom", query: { id: examCode.value } });
  } else {
    notify({
      type: 'error',
      text: "Wrong exam id!",
    });
  }
}

const handleJoinVideo = async () => {
  router.push({ name: "videoCall", query: { id: videoCode.value } });
}

onMounted(() => {
  const examStore = useExamStore()
  examStore.$reset();
});
</script>

<template>
  <div class="container xl:max-w-6xl mx-auto px-4 py-6">
    <div class="flex justify-between gap-5">
      <div class="w-full rounded-xl bg-white h-40 shadow-md flex items-center justify-center p-10">
        <div class="flex gap-2 w-full rounded-xl bg-[#F7F8F7] h-20 border border-black p-3">
          <input type="text" name="" id="" placeholder="Enter an exam code" class="flex-grow" v-model="examCode">
          <button class="bg-black text-white px-4 h-full w-[20%]" @click="handleJoinExam">
            JOIN
          </button>
        </div>
      </div>
      <div class="w-full rounded-xl bg-white h-40 shadow-md flex items-center justify-center p-10">
        <div class="flex gap-2 w-full rounded-xl bg-[#F7F8F7] h-20 border border-black p-3">
          <input type="text" name="" id="" placeholder="Enter a room code" class="flex-grow" v-model="videoCode">
          <button class="bg-black text-white px-4 h-full w-[20%]" @click="handleJoinVideo">
            JOIN
          </button>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-3 justify-center w-full gap-4 mt-10">
      <div
        class="w-full p-4 bg-white border border-gray-200 rounded-lg hover:shadow-[var(--third)] hover:shadow-md dark:bg-gray-800 dark:border-gray-700 text-center flex flex-col items-center">
        <router-link :to="{ name: 'listOfTest' }">
          <img class="rounded-t-lg" src="@assets/images/list_of_test.png" alt="" />
        </router-link>
        <div class="p-5">
          <router-link :to="{ name: 'listOfTest' }">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">LIST OF TESTS</h5>
          </router-link>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Search for exam questions stored in the exam bank.
          </p>
        </div>
      </div>
      <div
        v-if="user.type=='teacher'"
        class="w-full p-4 bg-white border border-gray-200 rounded-lg hover:shadow-[var(--third)] hover:shadow-md dark:bg-gray-800 dark:border-gray-700 text-center flex flex-col items-center">
        <router-link :to="{ name: 'createExam' }">
          <img class="rounded-t-lg h-[246px]" src="@assets/images/create_question.svg" alt="" />
        </router-link>
        <div class="p-5">
          <router-link :to="{ name: 'createExam' }">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">CREATE QUESTIONS</h5>
          </router-link>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Create your quiz. Attention should be paid to the
            type of exam questions, exam time, .. to maximize the effectiveness of the exam.</p>
        </div>
      </div>
      <div
        class="w-full p-4 bg-white border border-gray-200 rounded-lg hover:shadow-[var(--third)] hover:shadow-md dark:bg-gray-800 dark:border-gray-700 text-center flex flex-col items-center">
        <router-link :to="{ name: 'questionBank' }">
          <img class="rounded-t-lg h-[246px]" src="@assets/images/question_bank.svg" alt="" />
        </router-link>
        <div class="p-5">
          <router-link :to="{ name: 'questionBank' }">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">QUESTIONS BANK</h5>
          </router-link>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Summarize all questions by topic of each exam
            already in the system.</p>
        </div>
      </div>

    </div>

  </div>
</template>

<style lang="scss" scoped></style>
