<script setup>
import { useRoute } from "vue-router";
import { computed, watch, ref } from "vue";
import PreLoader from './components/common/PreLoader.vue'

import DefaultLayout from "@/layouts/DefaultLayout.vue";
import FullScreenLayout from "@/layouts/FullScreenLayout.vue";
import VideoCallView from './views/VideoCallView.vue'
import { useVideoCallStore } from "./stores/videoCall";
import { storeToRefs } from "pinia";
const route = useRoute();
const videoCall = ref(null)
const {isShowVideoCall, callerName} = storeToRefs(useVideoCallStore());
const {toggleShowVideoCall} = useVideoCallStore();
const currentLayout = computed(() => {
  switch (route.meta.layout) {
    case "DefaultLayout":
      return DefaultLayout;
    case "FullScreenLayout":
      return FullScreenLayout
    default:
      return DefaultLayout;
  }
});

const isRouterLoaded = computed(() => {
  if (route.name !== null) return true;
  return false;
});

watch(
  route,
  (to) => {
    document.title = to.meta.title;
  },
  { flush: "pre", immediate: true, deep: true }
);

watch(
  isShowVideoCall,
  (newValue) => {
    if(newValue){
      videoCall.value.startCall();
    }
  }
);

</script>


<template>
  <!-- Layout component -->
  <PreLoader></PreLoader>
  <notifications />
  <div v-if="callerName" class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" @click="toggleShowVideoCall">{{ callerName }} calling...</div>
  <VideoCallView v-show="isShowVideoCall" ref="videoCall" @close="toggleShowVideoCall"></VideoCallView>
  <div class="w-full mx-auto flex justify-center items-center">
    <component :is="currentLayout" v-if="isRouterLoaded">
      <RouterView />
    </component>
  </div>
</template>

<style lang="scss">
#app {
  font-weight: normal;
}

#page {
  position: relative;
}

nav.scrolled {
  @apply shadow-2xl;
  border-bottom: 0px;
}
</style>
