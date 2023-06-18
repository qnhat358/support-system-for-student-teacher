<script setup>
import { storeToRefs } from "pinia";
import { computed, handleError, reactive, ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { formatDateString } from "@/utils/utils";

const { user } = storeToRefs(useAuthStore());
const isOpen = ref(false);
const formData = reactive({
  fullname: user.value.fullname,
  phone: user.value.phone,
  birthday: user.value.birthday,
});

const formatBirthday = computed(() => {
  return formatDateString(user.value.birthday);
});

const openModal = () => {
  isOpen.value = true;
};
const closeModal = () => {
  isOpen.value = false;
};
const handleUpdateInfo = () => {
  isOpen.value = false;
};
</script>

<template>
  <div class="container xl:max-w-6xl mx-auto px-4 py-6 mt-20">
    <div class="mx-auto">
      <div
        class="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg"
      >
        <div class="px-6 flex flex-col lg:flex-row">
          <div class="flex flex-wrap justify-center">
            <div class="w-full px-4 flex justify-center">
              <div class="relative">
                <img
                  alt="..."
                  src="@assets/images/avatar.jpg"
                  class="shadow-xl rounded-full h-auto border-none -m-16 lg:m-8 max-w-[150px] lg:max-w-[300px]"
                />
              </div>
            </div>
          </div>
          <div class="text-center lg:text-left mt-20 lg:mt-10 mx-auto">
            <h3
              class="text-4xl font-semibold leading-normal text-gray-800 mb-5"
            >
              {{ user.username }}
            </h3>
            <div class="mb-4 text-2xl">
              <span>Fullname: {{ user.fullname }}</span>
            </div>
            <div class="mb-4 text-2xl">
              <span>Phone number: {{ user.phone }}</span>
            </div>
            <div class="mb-4 text-2xl">
              <span>Date of birth: {{ formatBirthday }}</span>
            </div>
            <div class="mb-4 text-2xl">
              <span>Role: {{ user.type }}</span>
            </div>
            <button
              @click="openModal"
              class="bg-black active:bg-[var(--primary)] uppercase text-white font-bold hover:shadow-md shadow text-xs px-10 py-2 rounded outline-none focus:outline-none sm:mr-2 my-10"
              type="button"
              style="transition: all 0.15s ease 0s"
            >
              Edit
            </button>
            <!-- Modal -->
            <div
              v-if="isOpen"
              class="fixed inset-0 flex items-center justify-center"
            >
              <div class="bg-gray-800 bg-opacity-50 absolute inset-0"></div>
              <div class="bg-white rounded-lg py-2 px-4 z-10">
                <!-- Modal content -->
                <div
                  class="flex items-start justify-between border-b dark:border-gray-600 pb-2 mb-4"
                >
                  <h2 class="text-xl font-bold text-gray-900 dark:text-white">
                    Update info
                  </h2>
                  <button
                    type="button"
                    class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    data-modal-hide="defaultModal"
                  >
                    <svg
                      aria-hidden="true"
                      class="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div class="form-update flex flex-col gap-2">
                  <div class="flex items-start justify-between">
                    <span class="font-bold">Full name</span>
                    <input type="text" v-model="formData.fullname" />
                  </div>
                  <div class="flex items-start justify-between">
                    <span class="font-bold">Phone number</span>
                    <input
                      type="number"
                      class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
                      v-model="formData.phone"
                    />
                  </div>
                  <div class="flex items-start justify-between">
                    <span class="font-bold">Birthday</span>
                    <input type="date" v-model="formData.birthday" />
                  </div>
                </div>
                <div class="flex justify-end mt-10 border-t">
                  <button
                    @click="handleUpdateInfo"
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2 mt-2"
                  >
                    Update
                  </button>
                  <button
                    @click="closeModal"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                  >
                    Cancel
                  </button>
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
