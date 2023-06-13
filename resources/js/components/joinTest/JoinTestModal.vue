<script setup>
import Modal from "@/components/common/Modal.vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth.js";
import { useExamStore } from "@/stores/exam.js";
import { useLoaderStore } from "@/stores/loader";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ANSWER_COLOR } from "@/utils/constants";
import CenterTextarea from "../common/CenterTextarea.vue"

const { fetchQuestionByExamId } = useExamStore();
const { exam } = storeToRefs(useExamStore());

const { loadingModal } = storeToRefs(useLoaderStore());
const router = useRouter();

const props = defineProps({
  id: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(["hideModal"]);

// const questions = ref([
//   {
//     question: 'What is\n my name ?',
//     point: 1,
//     type: 'multiple choice',
//     answers: [
//       {
//         content: 'Nhat',
//       },
//       {
//         content: 'Trung',
//       },
//       {
//         content: 'Heo',
//       },
//       {
//         content: 'Cuong',
//       },
//     ]
//   },
//   {
//     question: 'What is my name ?',
//     point: 2,
//     type: 'multiple choice',
//     answers: [
//       {
//         content: 'Nhat',
//         checked: false,
//       },
//       {
//         content: 'Trung',
//         checked: false,
//       },
//       {
//         content: 'Heo',
//         checked: false,
//       },
//       {
//         content: 'Cuong',
//         checked: false,
//       },
//     ]
//   },
//   {
//     question: 'What is my name 3?',
//     point: 2,
//     type: 'multiple choice',
//     answers: [
//       {
//         content: 'Nhat',
//         checked: false,
//       },
//       {
//         content: 'Trung',
//         checked: false,
//       },
//       {
//         content: 'Heo',
//         checked: false,
//       },
//       {
//         content: 'Cuong',
//         checked: false,
//       },
//     ]
//   },
// ])

const currentQuestionIndex = ref(0)

const nextQuestion = () => {
  if (currentQuestionIndex.value < exam.value.questions.length - 1) {
    ++currentQuestionIndex.value;
  }
}

const handleSubmit = () => {
  //call api submit
  emit("hideModal");
}
const closeModal = () => {
  emit("hideModal");
};

fetchQuestionByExamId(props.id);
</script>

<template>
  <div v-if="loadingModal == 0" class="bg-black w-full h-full fixed z-50 top-0 flex justify-center items-center p-2">
    <Transition name="slide" mode="in-out">
      <div class="relative z-10 mb-6 bg-[var(--second)] w-full p-5 rounded-lg text-white text-bold overflow-hidden"
        :key="currentQuestionIndex">
        <div class="font-bold flex justify-between gap-2 items-center w-1/2">
          <label for="questionType" class="min-w-fit">Type of question:</label>
          <select id="questionType" class="w-56 h-7 rounded-md p-0 px-3 bg-[var(--primary)]"
            v-model="exam.questions[currentQuestionIndex].type" disabled>
            <option value="">Choose type</option>
            <option value="Multiple Choice">Multiple choice</option>
            <option value="Enter Result">Enter result</option>
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
        <div>
          <CenterTextarea class="mt-4 rounded-lg focus-within:bg-[var(--primary)] text-3xl"
            placeholder="'Type your question here...'" :readOnly="true"
            v-model="exam.questions[currentQuestionIndex].content" />
        </div>
        <div class="mt-4 flex gap-2 relative">
          <div v-for="(answer, index) in exam.questions[currentQuestionIndex].answers" :key="index"
            :style="{ 'background-color': ANSWER_COLOR[index] }"
            class="h-[350px] grow rounded-2xl p-2 flex flex-col drop-shadow-xl" @click="answer.checked = !answer.checked">
            <div class="w-full flex flex-row justify-between">
              <div>
                <input type="checkbox" :checked='answer.checked'
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
.slide-enter-active,
.slide-leave-active {
  position: fixed;
  width: 100%;
  top: 2rem;
  left: 0.5rem;
}

.slide-enter-active {
  transition: transform 0.6s ease-in-out;
  z-index: 50;
  transform: translateX(100%);
}

.slide-enter-to {
  z-index: 50;
  transform: translateX(0%);
}

.slide-leave-active {
  z-index: -10;
}

.slide-leave-to {
  z-index: -10;
}
</style>