<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { useExamStore } from "@/stores/exam.js";
import { useAuthStore } from '@/stores/auth';
import { useRouter } from "vue-router";

const { fetchExamsByUserId, fetchExamDetailById } = useExamStore();
const { exams } = storeToRefs(useExamStore());
const { user } = storeToRefs(useAuthStore());

const router = useRouter();

const handleDetail = async (id) => {
  await fetchExamDetailById(id);
  router.push({ name: "detailTest" });
}

onMounted(async () => {
  await fetchExamsByUserId(user.value.id);
})
</script>

<template>
  <div class="container xl:max-w-6xl mx-auto px-4 py-6 mt-20">
    <div class="mx-auto">
      <div class="flex flex-col min-w-0 break-words bg-white w-full mb-6 p-4 shadow-xl rounded-lg">
        <div class="relative overflow-x-auto sm:rounded-lg">
          <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  ID
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">
                    TOPIC
                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true"
                        fill="currentColor" viewBox="0 0 320 512">
                        <path
                          d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg></a>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">
                    NAME
                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true"
                        fill="currentColor" viewBox="0 0 320 512">
                        <path
                          d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg></a>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  <div class="flex items-center">
                    DATE
                    <a href="#"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true"
                        fill="currentColor" viewBox="0 0 320 512">
                        <path
                          d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" />
                      </svg></a>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  SCORE
                </th>
                <th scope="col" class="px-6 py-3">
                  <span class="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(exam, index) in exams" :key="index"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50">
                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {{ exam.id }}
                </th>
                <td class="px-6 py-4">
                  {{ exam.topic }}
                </td>
                <td class="px-6 py-4">
                  {{ exam.content }}
                </td>
                <td class="px-6 py-4">
                  {{ exam.date }}
                </td>
                <td class="px-6 py-4">
                  {{ exam.totalPoint }}
                </td>
                <td class="px-6 py-4 text-right">
                  <button class="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    @click="handleDetail(exam.id)">Detail</button>
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
