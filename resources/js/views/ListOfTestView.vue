<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { useExamStore } from "@/stores/exam.js";
import { useAuthStore } from '@/stores/auth';
import { useRouter } from "vue-router";
import moment from 'moment';

const { fetchExamsByUserId, fetchExamDetailById, fetchResultsByUserId } = useExamStore();
const { exams, exam, results } = storeToRefs(useExamStore());
const { user } = storeToRefs(useAuthStore());

const router = useRouter();

const handleResult = async (id) => {
  // exam.value = {};
  if (user.value.type == 'teacher') {
    router.push({ name: "listOfResult", query: { id } });
  } else if (user.value.type == 'student') {
    router.push({ name: "detailResult", query: { id } });
  }
}
const handleDetail = async (id) => {
  router.push({ name: "detailTest", query: { id } });
}

onMounted(async () => {
  if (user.value.type == 'teacher') {
    await fetchExamsByUserId(user.value.id);
  } else if (user.value.type == 'student') {
    await fetchResultsByUserId();
  }
})
</script>

<template>
  <div class="container xl:max-w-6xl mx-auto px-4 py-6">
    <div class="mx-auto">
      <div class="flex flex-col min-w-0 break-words bg-white w-full mb-6 p-4 shadow-xl rounded-lg">
        <div class="relative overflow-x-auto sm:rounded-lg">
          <table v-if="user.type == 'teacher'" class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3 text-center">
                  ID
                </th>
                <th scope="col" class="px-6 py-3">
                  TOPIC
                </th>
                <th scope="col" class="px-6 py-3">
                  NAME
                </th>
                <th scope="col" class="px-6 py-3">
                  DATE
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  VISIBILITY
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  RESULT
                </th>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only"></span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!exams.length">
                <td colspan="6" class="pt-2 text-center font-bold text-lg">No exam has been created</td>
              </tr>
              <tr v-for="(exam, index) in user.type == 'teacher' ? exams : results" :key="index"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                  {{ exam.id }}
                </th>
                <td class="px-6 py-4">
                  {{ exam.topic }}
                </td>
                <td class="px-6 py-4">
                  {{ exam.name }}
                </td>
                <td class="px-6 py-4">
                  {{ moment(exam.date).format('DD/MM/YYYY') }}
                </td>
                <td class="px-6 py-4 text-center">
                  {{ exam.visibility }}
                </td>
                <td class="px-6 py-4 text-center flex justify-center text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6 cursor-pointer" @click="handleResult(exam.id)">
                    <path stroke-linecap="round" stroke-linejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                  </svg>

                </td>
                <td class="px-6 py-4 text-right">
                  <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    @click="handleDetail(exam.id)">Detail</button>
                </td>
              </tr>
            </tbody>
          </table>

          <table v-if="user.type == 'student'" class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3 text-center">
                  STT
                </th>
                <th scope="col" class="px-6 py-3">
                  TOPIC
                </th>
                <th scope="col" class="px-6 py-3">
                  NAME
                </th>
                <th scope="col" class="px-6 py-3">
                  TIME
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  VISIBILITY
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  TOTAL POINT
                </th>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only"></span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!results.length">
                <td colspan="6" class="pt-2 text-center font-bold text-lg">No exam has been created</td>
              </tr>
              <tr v-for="(result, index) in results" :key="index"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white text-center">
                  {{ index + 1 }}
                </th>
                <td class="px-6 py-4">
                  {{ result.topic }}
                </td>
                <td class="px-6 py-4">
                  {{ result.name }}
                </td>
                <td class="px-6 py-4">
                  {{ moment(result.time_end).format('DD/MM/YYYY hh:ss') }}
                </td>
                <td class="px-6 py-4 text-center">
                  {{ result.visibility }}
                </td>
                <td class="px-6 py-4 text-center">
                  {{ result.point }}/{{ result.total_point }}
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    @click="handleResult(result.id)">Detail</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
