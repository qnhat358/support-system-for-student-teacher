<script setup>
import Modal from "@/components/common/Modal.vue";
import { storeToRefs } from "pinia";
import { useExamStore } from "@/stores/exam.js";
import { ref, computed, onMounted } from "vue";
import { ANSWER_COLOR } from "@/utils/constants";
import CenterTextarea from "../common/CenterTextarea.vue"
import { object, string } from "joi";
import { isImageURL } from '@/composables/checkImageUrl.js'

const { exam } = storeToRefs(useExamStore());

const props = defineProps({
  question: {
    type: Object,
    default: () => ({
      type: 'Multiple Choice',
      point: '1',
      content: '',
      answers: [
        {
          content: '',
          isCorrect: false,
        },
        {
          content: '',
          isCorrect: false,
        },
        {
          content: '',
          isCorrect: false,
        },
        {
          content: '',
          isCorrect: false,
        },
      ]
    })
  },
  index: Number,
});

const emit = defineEmits(["hideModal"]);

const question = ref({
  type: 'Multiple Choice',
  point: '1',
  content: '',
  answers: [
    {
      content: '',
      isCorrect: false,
    },
    {
      content: '',
      isCorrect: false,
    },
    {
      content: '',
      isCorrect: false,
    },
    {
      content: '',
      isCorrect: false,
    },
  ]
})

const answers = ref([
  {
    content: '',
    checked: false,
  },
  {
    content: '',
    checked: true,
  },
  {
    content: '',
    checked: false,
  },
  {
    content: '',
    checked: false,
  },
])

const removeAnswer = (index) => {
  if (question.value.answers.length > 2) {
    question.value.answers.splice(index, 1);
  }
}

const addAnswer = () => {
  if (question.value.answers.length < 5) {
    question.value.answers.push({
      content: '',
      isCorrect: false,
    })
  }
}

const handleAddQuestion = () => {
  if (props.question.hasOwnProperty('id')){
    exam.value.questions = exam.value.questions.map(item => {
      if (item.id == props.question.id) {
        item = question.value;
      }
      return item;
    });
    console.log(exam.value.questions);
  } else {
    exam.value.questions.push(question.value)
  }
  emit("hideModal");
}

const closeModal = () => {
  emit("hideModal");
};
function handleClick (index) {
  document.getElementsByClassName("fileInput" + index)[0].click();
}

async function handleFileSelect (event, answerIndex) {
  const file = event.target.files[0];
  question.value.answers[answerIndex].content = URL.createObjectURL(file);
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'm1cueo4o');

  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/qnhat358/image/upload', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    question.value.answers[answerIndex].content = result.url;
    event.target.value = ''
  } catch (error) {
    console.error(error);
  }
}

const gridClass = computed(() => {
  switch (question.value.answers.length) {
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

onMounted(() => {
  question.value = props.question;
})
</script>
<template>
  <Modal>
    <div class="relative z-0 mb-6 bg-[var(--second)] w-10/12 p-5 rounded-lg text-white text-bold">
      <div class="font-bold flex justify-between gap-2 items-center w-1/2">
        <label for="questionType" class="min-w-fit">Type of question:</label>
        <select id="questionType" class="w-56 h-7 rounded-md p-0 px-3 bg-[var(--primary)]" v-model="question.type">
          <option value="Multiple Choice">Multiple choice</option>
          <option value="Content Result">Enter result</option>
        </select>
        <label for="questionType" class="min-w-fit">Points:</label>
        <select id="questionType" class="w-30 h-7 rounded-md p-0 px-3 bg-[var(--primary)]" v-model="question.point">
          <option value="1" selected>1 point</option>
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
        <CenterTextarea
          class="mt-4 hover:border-4 border-[var(--third)] rounded-lg focus-within:bg-[var(--primary)] text-3xl"
          v-model="question.content" placeholder="'Type your question here...'" />
      </div>
      <div class="mt-4 grid gap-2" :class="gridClass">
        <div v-for="(answer, index) in question.answers" :key="index" :style="{ 'background-color': ANSWER_COLOR[index] }"
          class="h-[350px] grow rounded-2xl p-2 flex flex-col drop-shadow-xl">
          <div class="w-full flex flex-row justify-between">
            <div class="flex flex-row gap-2">
              <button
                class="flex items-center justify-center w-9 h-9 rounded-lg backdrop-brightness-110 hover:backdrop-brightness-125"
                :class="{ 'cursor-not-allowed': question.answers.length < 3 }" @click="removeAnswer(index)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                </svg>
              </button>
              <button
                class="flex items-center justify-center w-9 h-9 rounded-lg backdrop-brightness-110 hover:backdrop-brightness-125"
                @click="handleClick(index)">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                  stroke="currentColor" class="w-6 h-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                    d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </button>
              <input :class="'fileInput' + index" type="file" style="display: none;"
                @change="handleFileSelect($event, index)">
            </div>
            <div>
              <input type="checkbox" v-model="answer.isCorrect"
                class="rounded-full w-9 h-9 border-2 border-white checked:text-black focus:ring-0 brightness-75"
                :style="{ 'background-color': ANSWER_COLOR[index] }" />
            </div>
          </div>
          <div class="grow p-2 ">
            <div class="h-full flex flex-col items-center">
              <img v-if="isImageURL(answer.content)" :src="answer.content" class="max-w-full max-h-full">
              <CenterTextarea v-else
                class=" h-full focus-within:border-2 border-[var(--third)] rounded-lg focus-within:backdrop-brightness-50 text-3xl"
                v-model="answer.content" placeholder="'Type an answer option here...'" />
            </div>
          </div>

        </div>
        <button
          class="flex justify-center items-center flex-1 bg-white text-black text-3xl font-bold rounded-full w-12 h-12 absolute ml-8 left-full top-1/2 -translate-y-1/2"
          :class="{ 'cursor-not-allowed': question.answers.length > 4 }" @click="addAnswer">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor"
            class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
      <div class="flex justify-end gap-4 mt-4 text-xl font-bold">
        <button class="px-5 bg-white text-[var(--primary)] rounded-lg" @click="closeModal">Cancel</button>
        <button class="w-24 p-2 bg-[var(--primary)] rounded-lg" @click="handleAddQuestion">Save</button>
      </div>
    </div>
  </Modal>
</template>
<style lang="scss" scoped></style>