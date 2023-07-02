<script setup>
import Modal from "@/components/common/Modal.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import { useExamStore } from "@/stores/exam.js";
import { useLoaderStore } from "@/stores/loader";
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import { ANSWER_COLOR } from "@/utils/constants";
import CenterTextarea from "../common/CenterTextarea.vue"

const { exam } = storeToRefs(useExamStore());
const { submit } = useExamStore();

const { loadingModal } = storeToRefs(useLoaderStore());
const router = useRouter();

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(["hideModal"]);


const currentQuestionIndex = ref(0)

const nextQuestion = () => {
  if (currentQuestionIndex.value < exam.value.questions.length - 1) {
    ++currentQuestionIndex.value;
  }
}

const handleSubmit = async () => {
  //call api submit
  exam.value.timeEnd = new Date();
  await submit();
  emit("hideModal");
}

const countDown = ref(0);
const timer = ref(null);
function countDownTimer () {
  if (countDown.value > 0) {
    timer.value = setTimeout(() => {
      countDown.value -= 1
      countDownTimer()
    }, 1000)
  }
  else {
    handleSubmit();
  }
}

const countDownWidth = computed(() => {
  return (countDown.value / (exam.value.duration * 60)) * window.innerWidth;
})

const toMinutes = computed(() => {
  const minutes = (Math.floor(countDown.value / 60)).toString().padStart(2, '0');
  const seconds = (countDown.value % 60).toString().padStart(2, '0');
  return minutes + ' : ' + seconds;
})

const gridClass = computed(() => {
  switch (exam.value[currentQuestionIndex.value]?.question?.answers?.length ?? 4) {
    case 1:
      return 'grid-cols-1'
    case 2:
      return 'grid-cols-2'
    case 3:
      return 'grid-cols-3'
    case 4:
      return 'grid-cols-4'
    case 5:
      return 'grid-cols-5'
    default:
      return 'grid-cols-4';
  }
})

onMounted(async () => {
  exam.value.timeStart = new Date();
  countDown.value = exam.value.duration * 60
  countDownTimer();
})
</script>

<template>
  <div class="w-full bg-gray-200 h-1 dark:bg-gray-700 fixed top-0 z-[90]">
    <div class="bg-blue-600 h-1" :style="`width: ${countDownWidth}px`"></div>
  </div>
  <div v-if="loadingModal == 0" class="bg-black w-full h-full fixed z-50 top-0 flex justify-center items-center p-2">
    <Transition enter-active-class="animate__animated animate__backInRight"
      leave-active-class="animate__animated animate__slideOutLeft" >
      <div class="absolute z-10 mb-6 bg-[var(--second)] w-full p-5 rounded-lg text-white text-bold overflow-hidden"
        :key="currentQuestionIndex">
        <div class="w-full flex row">
          <div class="font-bold flex justify-between gap-2 items-center w-1/2">
            <label for="questionType" class="min-w-fit">Type of question:</label>
            <select id="questionType" class="w-56 h-7 rounded-md p-0 px-3 bg-[var(--primary)]"
              v-model="exam.questions[currentQuestionIndex].type" disabled>
              <option value="">Choose type</option>
              <option value="multiple choice">Multiple choice</option>
              <option value="enter result">Enter result</option>
            </select>
            <label for="questionPoint" class="min-w-fit">Points:</label>
            <select id="questionPoint" class="w-30 h-7 rounded-md p-0 px-3 bg-[var(--primary)]"
              v-model="exam.questions[currentQuestionIndex].point" disabled>
              <option value="1">1 point</option>
              <option value="2">2 points</option>
              <option value="3">3 points</option>
              <option value="4">4 points</option>
              <option value="5">5 points</option>
              <option value="6">6 points</option>
              <option value="7">7 points</option>
              <option value="8">8 points</option>
              <option value="9">9 points</option>
              <option value="10">10 points</option>
            </select>
          </div>
          <div class="flex w-1/2 justify-end">
            <span class="font-bold">
              Time left: {{ toMinutes }}
            </span>
          </div>
        </div>
        <div>
          <CenterTextarea class="mt-4 rounded-lg focus-within:bg-[var(--primary)] text-3xl"
            placeholder="'Type your question here...'" :readOnly="true"
            v-model="exam.questions[currentQuestionIndex].content" />
        </div>
        <div class="mt-4 grid gap-2" :class="gridClass">
          <div v-for="(answer, index) in exam.questions[currentQuestionIndex].answers" :key="index"
            :style="{ 'background-color': ANSWER_COLOR[index] }"
            class="h-[350px] grow rounded-2xl p-2 flex flex-col drop-shadow-xl"
            @click="answer.isCorrect = !answer.isCorrect">
            <div class="w-full flex flex-row justify-between">
              <div>
                <input type="checkbox" :checked='answer.isCorrect'
                  class="rounded-full w-9 h-9 border-2 border-white checked:text-black focus:ring-0 brightness-75"
                  :style="{ 'background-color': ANSWER_COLOR[index] }" />
              </div>
            </div>
            <div class="grow p-2">
              <CenterTextarea
                class=" h-full focus-within:border-2 border-[var(--third)] rounded-lg focus-within:backdrop-brightness-50 text-3xl"
                :readOnly="true" v-model="answer.content" />
            </div>
          </div>
        </div>
        <div class="flex justify-end gap-4 mt-4 text-xl font-bold">
          <button v-if="currentQuestionIndex < exam.questions.length - 1" class="w-24 p-2 bg-[var(--primary)] rounded-lg"
            @click="nextQuestion">Next</button>
          <button v-else class="w-24 p-2 bg-[var(--primary)] rounded-lg" @click="handleSubmit">Submit</button>
        </div>
      </div>
    </Transition>
  </div>
</template>
<style lang="scss" scoped>
.animate__animated.animate__backInRight, .animate__animated.animate__slideOutLeft {
  --animate-duration: 0.8s;
}
</style>