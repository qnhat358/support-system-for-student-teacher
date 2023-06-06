<script setup>
</script>

<template>
  <div class="container xl:max-w-6xl mx-auto px-4 py-6 mt-20">
    <div class="mx-auto">
      <div class="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
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
            <h3 class="text-4xl font-semibold leading-normal text-gray-800 mb-5">
              Qnhat358
            </h3>
            <div class="mb-4 text-2xl ">
              <span>Fullname: Tran Duy Quang Nhat</span>
            </div>
            <div class="mb-4 text-2xl ">
              <span>Phone number: 0123456789</span>
            </div>
            <div class="mb-4 text-2xl ">
              <span>Date of birth: 03/12/2000</span>
            </div>
            <div class="mb-4 text-2xl ">
              <span>Role: Student</span>
            </div>
            <button
              class="bg-black active:bg-[var(--primary)] uppercase text-white font-bold hover:shadow-md shadow text-xs px-10 py-2 rounded outline-none focus:outline-none sm:mr-2 my-10"
              type="button"
              style="transition: all 0.15s ease 0s;"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
</style>
