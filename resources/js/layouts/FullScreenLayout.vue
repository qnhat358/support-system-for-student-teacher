<script setup>
import { useRoute } from "vue-router";
import Footer from "@/components/Footer.vue";
import Header from "@/components/Header.vue";

const route = useRoute();
</script>

<template>
  <div class="w-full h-full">
    <!-- Main Content -->
    <div class="h-full flex flex-col items-center justify-center">
      <div class="h-full w-full min-h-screen bg-[#F7F8F7] flex flex-col items-center justify-center">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>