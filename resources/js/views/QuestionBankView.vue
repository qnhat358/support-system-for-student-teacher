<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from "pinia";
import { useExamStore } from "@/stores/exam.js";
import { useRouter } from "vue-router";
import useDetectOutsideClick from "../composables/useDetectOutsideClick";

const { getExamsByTopic, exam } = storeToRefs(useExamStore());
const { fetchPublicExams, fetchExamById } = useExamStore();

const router = useRouter();

const isShowDropdown = ref(false);
const dropdownRef = ref();
const expandId = ref(null);
const searchForm = ref({
  topic: 'All topics',
  keySearch: '',
})
const topics = [
  {
    name: 'Mathematics',
    icon: 'Mathematics.png',
  },
  {
    name: 'Literature',
    icon: 'Literature.png',
  },
  {
    name: 'History',
    icon: 'History.png',
  },
  {
    name: 'Physics',
    icon: 'Physics.png',
  },
  {
    name: 'Chemistry',
    icon: 'Chemistry.png',
  },
  {
    name: 'English',
    icon: 'English.png',
  },
  {
    name: 'Informatics',
    icon: 'Informatics.png',
  },
  {
    name: 'Biology',
    icon: 'Biology.png',
  },
]

const allTests = ref([
  {
    topic: 'Mathematics',
    test: [
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
    ]
  },
  {
    topic: 'Literature',
    test: [
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
    ]
  },
  {
    topic: 'History',
    test: [
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
    ]
  },
  {
    topic: 'Physics',
    test: [
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
    ]
  },
  {
    topic: 'Chemistry',
    test: [
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
    ]
  },
  {
    topic: 'Informatics',
    test: [
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
    ]
  },
  {
    topic: 'English',
    test: [
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
      {
        content: 'Content 1',
        totalQuestion: 10,
      },
    ]
  },
])

const changeTopic = (topic) => {
  searchForm.value.topic = topic;
  isShowDropdown.value = false;
}
const toggleExpand = (index) => {
  if (expandId.value != index) {
    expandId.value = index;
  } else {
    expandId.value = null;
  }
}

const handleDetail = async (id) => {
  exam.value = {};
  await fetchExamById(id);
  router.push({ name: 'joinTest', query: {id}});
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
} 

useDetectOutsideClick(dropdownRef, () => {
  isShowDropdown.value = false;
});

onMounted(async () => {
  await fetchPublicExams();
})
</script>

<template>
  <div class="container xl:max-w-6xl mx-auto px-4 py-6 mt-10">
    <div class="mx-auto">
      <div class="text-center text-4xl font-semibold">
        <p>What will you learn today?</p>
      </div>
      <div class="flex mt-10 shadow-lg rounded-lg h-16">
        <div ref="dropdownRef" class="relative flex border-r border-gray-300">
          <button id="dropdown-button" @click="isShowDropdown = !isShowDropdown"
            class="z-10 inline-flex  items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-white  rounded-l-lg hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600  dark:text-white"
            type="button">All topics <svg aria-hidden="true" class="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg></button>
          <div id="dropdown" v-if="isShowDropdown"
            class="absolute top-full mt-1 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
              <li>
                <button v-for="(topic, index) in topics" type="button"
                  class="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  @click="changeTopic(topic.name)">{{ topic.name }}</button>
              </li>
            </ul>
          </div>
        </div>
        <div class="relative flex w-full h-full">
          <input type="search" id="search-dropdown"
            class="block p-4 w-11/12 h-full z-20 text-xl text-gray-900 bg-white rounded-r-lg border-none dark:bg-gray-700 dark:placeholder-gray-400 dark:text-white focus:ring-0"
            placeholder="Search for tests on any topic" required>
          <button type="submit"
            class="h-full w-20 flex flex-row items-center justify-center grow p-2.5 text-sm font-medium text-white bg-[var(--second)] rounded-r-lg hover:bg-[var(--third)] dark:bg-blue-600 dark:hover:bg-[var(--second)]">
            <svg aria-hidden="true" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <span class="sr-only">Search</span>
          </button>
        </div>
      </div>
      <div class="mt-10 w-full flex items-center justify-center gap-10">
        <div v-for="(exam, index) in getExamsByTopic" :key="index" class="text-center flex flex-col items-center">
          <div
            class="bg-[var(--primary)] hover:brightness-90 rounded-full p-3 aspect-square w-[80px] flex items-center justify-center">
            <img :src="`/assets/images/${capitalizeFirstLetter(exam.topic)}.png`" class="w-[50px] cursor-pointer" alt="..." />
          </div>
          <span class="font-medium">{{ capitalizeFirstLetter(exam.topic) }}</span>
        </div>
      </div>
      <div class="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg px-6 mt-10">
        <div v-for="(topic, index) in getExamsByTopic" :key="index">
          <div>
            <h2>
              <button type="button"
                class="flex items-center justify-between w-full py-5 font-medium text-left text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400"
                @click="toggleExpand(index)">
                <span class="text-lg text-black font-semibold">{{ capitalizeFirstLetter(topic.topic) }}</span>
                <svg class="w-6 h-6 rotate shrink-0" :class="{ 'rotate-180': expandId == index }" fill="currentColor"
                  viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </button>
            </h2>
            <div :class="{ hidden: expandId != index }">
              <div class="py-5 border-b border-gray-200 dark:border-gray-700">
                <div v-for="(test, index) in topic.exams" :key="index"
                  class="flex flex-row justify-between hover:bg-gray-400 px-2" @click="handleDetail(test.id)">
                  <span class="mb-2 text-gray-500 dark:text-gray-400">{{ test.name }}</span>
                  <span class="mb-2 text-gray-500 dark:text-gray-400">Grade: {{ test.grade }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
