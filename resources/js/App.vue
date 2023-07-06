<script setup>
import { useRoute } from "vue-router";
import { computed, watch, ref } from "vue";
import PreLoader from './components/common/PreLoader.vue'
import 'animate.css';
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import FullScreenLayout from "@/layouts/FullScreenLayout.vue";
import VideoCallView from './views/VideoCallView.vue'
import { useVideoCallStore } from "./stores/videoCall";
import { storeToRefs } from "pinia";
const route = useRoute();
const videoCall = ref(null)
const { isShowVideoCall, callerName, avatar } = storeToRefs(useVideoCallStore());
const { toggleShowVideoCall } = useVideoCallStore();
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
    if (newValue) {
      videoCall.value.startCall();
    }
  }
);

const declineVideoCall = () => {

}

</script>


<template>
  <!-- Layout component -->
  <PreLoader></PreLoader>
  <notifications />
  <Transition name="incoming-call" enter-active-class="animate__animated animate__slideInDown">
    <div v-if="callerName"
      class="fixed flex justify-between row items-center z-50 p-3 top-2 right-2 w-[400px] bg-blue-100 rounded-xl border"
    >
      <div class="flex items-center">
        <img v-if="avatar" :src="avatar"
                  class="h-16 w-16 rounded-full" />
                <img v-else src="@assets/images/avatar.jpg"
                  class="h-16 w-16 rounded-full" />
        <div class="flex flex-col ml-4">
          <span class="font-bold">{{callerName}}</span>
          <span class="text-gray-500">Voice Call</span>
        </div>
      </div>
      <div class="flex ">
        <img src="@assets/images/declineCall.png" class="w-12 h-12 rounded-full cursor-pointer mr-5" @click="declineVideoCall">
        <img src="@assets/images/acceptCall.png" class="w-12 h-12 rounded-full cursor-pointer" @click="toggleShowVideoCall">
      </div>
    </div>
  </Transition>
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

.animate__animated.animate__slideInDown {
  --animate-duration: 1s;
}
.animate__animated.animate__slideOutUp {
  --animate-duration: 1s;
}
</style>
