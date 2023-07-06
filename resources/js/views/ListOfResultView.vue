<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { useExamStore } from "@/stores/exam.js";
import { useAuthStore } from '@/stores/auth';
import { useRouter, useRoute } from "vue-router";
import moment from 'moment';

const { fetchResultsDetailByExamId, fetchResultsByUserId } = useExamStore();
const { user } = storeToRefs(useAuthStore());

const router = useRouter();
const route = useRoute();

const results = ref([]);
const exam = ref([]);

const handleDetail = async (id) => {
  router.push({ name: "detailResult", query: { id } });
}

onMounted(async () => {
  const {exam, result }= await fetchResultsDetailByExamId(route.query.id);
  exam.value = exam;
  results.value = result;
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
                <th scope="col" class="px-6 py-3">
                  NAME
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  TOTAL POINTS
                </th>
                <th scope="col" class="px-6 py-3 text-center">
                  TOTAL QUESTIONS
                </th>
                <th scope="col" class="px-6 py-3">
                  TIME START
                </th>
                <th scope="col" class="px-6 py-3">
                  TIME END
                </th>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only"></span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="!results.length">
                <td colspan="6" class="pt-2 text-center font-bold text-lg">No result</td>
              </tr>
              <tr v-for="(result, index) in results" :key="index"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {{ result.fullname }}
                </th>
                <td class="px-6 py-4 text-center">
                  {{ result.total_point }}
                </td>
                <td class="px-6 py-4 text-center">
                  {{ result.total_question }}
                </td>
                <td class="px-6 py-4">
                  {{ moment(result.time_start).format('DD/MM/YYYY hh:ss') }}
                </td>
                <td class="px-6 py-4">
                  {{ moment(result.time_end).format('DD/MM/YYYY hh:ss') }}
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    @click="handleDetail(result.id)">Detail</button>
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
