<script setup>
import { ref, computed } from "vue";
import useDetectOutsideClick from "../../composables/useDetectOutsideClick";
const props = defineProps({
  modelValue: String,
  label: String,
  labelWidth: {
    type: String,
    default: "100px",
  },
  labelColor: {
    type: String,
    default: "white",
  },
  labelBackground: {
    type: String,
    default: "var(--color-blue-4)",
  },
  options: {
    type: Array,
    default: [],
  },
  menuWidth: {
    type: String,
    default: "288px",
  },
  menuHeight: {
    type: String,
    default: "fit-content",
  },
  location: {
    type: String,
    default: "bottom",
  },
});

const emit = defineEmits(["update:label"]);

const dropdownRef = ref();
const isShowMenu = ref(false);

const locationClass = computed(() => {
  switch (props.location) {
    case "top":
      return "bottom-full left-1/2 -translate-x-1/2";
    case "bottom":
      return "left-1/2 -translate-x-1/2";
    case "left":
      return "right-full top-1/2 -translate-y-1/2";
    case "right":
      return "left-full top-1/2 -translate-y-1/2";
    case "top-left":
      return "bottom-full right-0";
    case "top-right":
      return "bottom-full left-0";
    case "bottom-left":
      return "top-full right-0";
    case "bottom-right":
      return "top-full left-0";
    default:
      break;
  }
});

const clickHandle = (option) => {
  if (option != props.label) {
    emit("update:label", option);
  }
  isShowMenu.value = false;
};

const toggleMenu = () => {
  isShowMenu.value = !isShowMenu.value;
};

useDetectOutsideClick(dropdownRef, () => {
  isShowMenu.value = false;
});
</script>
<template>
  <div class="relative w-fit" ref="dropdownRef">
    <!-- Dropdown button -->
    <div @click="isShowMenu = !isShowMenu" class="w-fit">
      <slot name="button">
        <button id="dropdownButton" data-dropdown-toggle="dropdown" class="
                  flex
                  items-center
                  justify-between
                  w-full
                  mx-1
                  pl-3
                  pr-4
                  font-medium
                  text-gray-700
                  border-b border-gray-100
                  hover:bg-gray-50
                  md:hover:bg-transparent
                  md:border-0
                  md:hover:text-blue-700
                  md:p-0
                  md:w-auto
                ">
          <slot name="buttonLabel">
            {{ label }}
            <svg class="w-4 h-4 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clip-rule="evenodd"></path>
            </svg>
          </slot>
        </button>
      </slot>
    </div>
    <!-- Dropdown menu -->
    <div id="dropdownMenu" v-show="isShowMenu" class="
              absolute
              bg-white
              rounded-lg
              z-[70]
              shadow
              text-left
              dark:bg-gray-700 dark:divide-gray-600
              overflow-x-hidden overflow-y-hidden
            " :class="locationClass">
      <slot name="menu" :toggleMenu="toggleMenu">
        <ul class="text-[16px] leading-[22px] py-2" aria-labelledby="dropdownButton">
          <li v-for="(option, index) in options" :key="index" :value="index" @click="clickHandle(option)" class="block">
            <p class="
                      block
                      px-4
                      py-2
                      hover:bg-gray-100
                      dark:hover:bg-gray-600 dark:hover:text-white
                      cursor-pointer
                    " :style="option == label ? 'color: #3CCE69' : ''">
              {{ option }}
            </p>
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#dropdownMenu {
  width: v-bind(menuWidth);
  height: v-bind(menuHeight);
}
</style>