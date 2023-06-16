<script setup>
import { ref, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useExamStore } from "@/stores/exam.js";
import { useRoute } from "vue-router";
import { toHHMMstring, toISOdate } from "../composables/dateTimeConvert";
const route = useRoute();

const { exam } = storeToRefs(useExamStore());
const { fetchExamById } = useExamStore();
const id = ref('');
onMounted(async()=>{
  id.value = route.query.id;
  await fetchExamById(id.value);
})
</script>

<template>
  <div class="container mx-auto px-4 py-6 mb-56 flex flex-col">
    <div class="flex-row flex gap-5 h-96">
      <div class="w-[50%] rounded-xl bg-white p-8 shadow-md flex flex-col items-start justify-between text-xl gap-10">
        <div>
          <span class="font-semibold">Exam name: </span> {{ exam.name }}
        </div>
        <div>
          <span class="font-semibold">Exam date: </span> {{ toISOdate(exam.date) }}
        </div>
        <div>
          <span class="font-semibold">Exam start: </span> {{ toHHMMstring(exam.start) }}
        </div>
        <div>
          <span class="font-semibold">Exam end: </span> {{ toHHMMstring(exam.end) }}
        </div>
      </div>
      <div
        class="w-[30%] rounded-xl bg-white shadow-md flex flex-col justify-start items-center border-2 border-[var(--third)]">
        <div class="border-2 rounded-t-xl bg-[var(--second)] w-full p-2 flex justify-center">
          <p class="text-xl font-bold">Active Users</p>
        </div>
        <div class="cursor-context-menu">
          <p>User 1</p>
          <p>User 2</p>
          <p>User 3</p>
        </div>
      </div>
      <div
        class="w-full rounded-xl bg-white shadow-md flex flex-col justify-start items-center border-2 border-[var(--third)]">
        <div class="border-2 rounded-t-xl bg-[var(--second)] w-full p-2 flex justify-center">
          <p class="text-xl font-bold">Chat</p>
        </div>
        <div>
        </div>
      </div>
    </div>
    <router-link :to="{ name: 'joinTest', query: {id}}"
      class="mt-10 w-[300px] p-2 bg-white text-[var(--primary)] text-2xl font-bold rounded-lg border border-[var(--primary)] shadow-lg self-center text-center">
      Start
    </router-link>
  </div>
</template>

<style lang="scss" scoped></style>
