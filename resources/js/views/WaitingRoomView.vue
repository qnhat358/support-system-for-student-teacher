<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useExamStore } from "@/stores/exam.js";
import { useRouter } from "vue-router";

const { exam } = storeToRefs(useExamStore());
exam.value = {
  name: 'Exam test 1',
  date: '07/06/2023',
  start: '20:00',
  end: '21:00',
}
</script>

<template>
  <div class="container mx-auto px-4 py-6 mb-56 flex flex-col">
    <div class="flex-row flex gap-5 h-96">
      <div class="w-[50%] rounded-xl bg-white p-8 shadow-md flex flex-col items-start justify-between text-xl gap-10">
        <div>
          <span class="font-semibold">Exam name: </span> {{ exam.name }}
        </div>
        <div>
          <span class="font-semibold">Exam date: </span> {{ exam.date }}
        </div>
        <div>
          <span class="font-semibold">Exam start: </span> {{ exam.start }}
        </div>
        <div>
          <span class="font-semibold">Exam end: </span> {{ exam.end }}
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
    <router-link :to="{ name: 'joinTest' }"
      class="mt-10 w-[300px] p-2 bg-white text-[var(--primary)] text-2xl font-bold rounded-lg border border-[var(--primary)] shadow-lg self-center text-center">
      Start
    </router-link>
  </div>
</template>

<style lang="scss" scoped></style>
