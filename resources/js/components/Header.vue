<script setup>
import { ref, onBeforeMount, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import Dropdown from "./common/Dropdown.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.js";

const { isAuthenticated } = storeToRefs(useAuthStore());
const { logout } = useAuthStore();

const router = useRouter();
const route = useRoute();

const dropdownItems = ["Help Centre", "Shpock + for professionals"];
const atTopOfPage = ref(true);
const searchValue = ref(route.query.q ?? "");
const isShowModal = ref(false);
// the function to call when the user scrolls, added as a method
const handleScroll = () => {
  // when the user scrolls, check the pageYOffset
  if (window.pageYOffset > 0) {
    // user is scrolled
    if (atTopOfPage.value) atTopOfPage.value = false;
  } else {
    // user is at top of page
    if (!atTopOfPage.value) atTopOfPage.value = true;
  }
};

const searchHandle = () => {
  router.push({ name: "result", query: { q: searchValue.value } });
};

const handleLogout = async () => {
  await logout();
  location.reload();
}

onBeforeMount(async () => {
  window.addEventListener("scroll", handleScroll);
});
</script>

<template>
  <header class="fixed top-0 left-0 right-0 z-40">
    <nav class="main-nav" :class="{ 'navbar-scrolled': !atTopOfPage }">
      <div v-if="!isAuthenticated" class="container xl:max-w-6xl mx-auto px-4">
        <div class="lg:flex lg:justify-between">
          <div class="flex justify-between">
            <router-link :to="{ name: 'landing' }"
              class="mx-w-10 text-4xl font-bold capitalize text-gray-900 flex items-center">EasyQuiz</router-link>
            <!-- mobile nav -->
            <div class="flex flex-row items-center py-4 lg:py-0">
              <div class="relative text-gray-900 hover:text-black block lg:hidden">
                <button type="button" class="menu-mobile block py-3 px-6 border-b-2 border-transparent">
                  <span class="sr-only">Mobile menu</span>
                  <svg class="open h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                    </path>
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="close bi bi-x-lg h-8 w-8" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                      d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                    <path fill-rule="evenodd"
                      d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="flex flex-row">
            <!-- nav menu -->
            <ul
              class="navbar bg-white lg:bg-transparent w-full hidden text-center lg:text-left lg:flex lg:flex-row text-gray-900 text-sm items-center font-bold">
              <li class="relative hover:text-black">
                <a class="active block py-3 lg:py-7 px-6 border-b-2 border-transparent" href="#home">Home</a>
              </li>
              <li class="relative hover:text-black">
                <a class="block py-3 lg:py-7 px-6 border-b-2 border-transparent" href="#services">What we do</a>
              </li>
              <li class="relative hover:text-black">
                <a class="block py-3 lg:py-7 px-6 border-b-2 border-transparent" href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div class="flex items-center">
            <router-link to="/login-register/login"
              class="block font-bold py-3 lg:py-7 px-6 border-b-2 border-transparent text-[var(--primary)]">
              Log In</router-link>
            <router-link to="/login-register/register"
              class="block font-bold py-3 text-white px-6 border-b-2 border-transparent rounded-full bg-[var(--primary)]">
              Register</router-link>
          </div>
        </div>
      </div>

      <div v-else class="container xl:max-w-6xl mx-auto px-4">
        <div class="lg:flex lg:justify-between">
          <div class="flex justify-between">
            <router-link :to="{ name: 'home' }"
              class="mx-w-10 text-4xl font-bold capitalize text-gray-900 flex items-center">EasyQuiz</router-link>
            <!-- mobile nav -->
            <div class="flex flex-row items-center py-4 lg:py-0">
              <div class="relative text-gray-900 hover:text-black block lg:hidden">
                <button type="button" class="menu-mobile block py-3 px-6 border-b-2 border-transparent">
                  <span class="sr-only">Mobile menu</span>
                  <svg class="open h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16">
                    </path>
                  </svg>

                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                    class="close bi bi-x-lg h-8 w-8" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
                      d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z" />
                    <path fill-rule="evenodd"
                      d="M2.146 2.146a.5.5 0 0 0 0 .708l11 11a.5.5 0 0 0 .708-.708l-11-11a.5.5 0 0 0-.708 0Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="flex flex-row">
            <!-- nav menu -->
            <ul
              class="navbar bg-white lg:bg-transparent w-full hidden text-center lg:text-left lg:flex lg:flex-row text-gray-900 text-sm items-center font-bold">
              <li class="relative hover:text-black">
                <router-link :to="{ name: 'home' }" class="active block py-3 lg:py-7 px-6 border-b-2 border-transparent"
                  href="#home">Home</router-link>
              </li>
              <li class="relative hover:text-black">
                <router-link :to="{ name: 'profile' }" class="block py-3 lg:py-7 px-6 border-b-2 border-transparent"
                  href="#services">Profile</router-link>
              </li>
              <li class="relative hover:text-black">
                <a class="block py-3 lg:py-7 px-6 border-b-2 border-transparent" href="#portfolio">Statistical</a>
              </li>
            </ul>
          </div>
          <div class="flex items-center">
            <button
              class="block py-3 h-fit text-white font-bold px-6 border-b-2 border-transparent rounded-full bg-[var(--primary)]"
              @click="handleLogout">Log Out</button>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
nav {
  z-index: 1000;
}

nav.scrolled {
  @apply shadow-2xl;
  border-bottom: 0px;
}
</style>


