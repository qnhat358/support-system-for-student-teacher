<script setup>
import { placeholder } from '@babel/types';
import { ref, onMounted, computed } from 'vue';

const props = defineProps({
  placeholder: {
    type: String,
  },
  readOnly: {
    type: Boolean,
    default: false,
  },
  modelValue: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(["update:modelValue"]);
const contentEditable = ref(null);
const input = ref(props.modelValue);

const placeholderClass = computed(() => {
  if (input.length) {
    return 'before:hidden'
  } else {
    return "before:hidden before:content-['sss']"
  }
})

const fontSize = computed(() => {
  const characterCount = input.value.length;
  if (characterCount < 100) {
    return '100%'
  } else if (characterCount < 200) {
    return '75%';
  } else {
    return '50%';
  }
});

onMounted(() => {
  contentEditable.value.addEventListener('input', handleInput);
});

const focusContentEditable = () => {
  contentEditable.value.focus();
};

const handleInput = () => {
  // Access the edited content using contentEditable.value.innerText
  input.value = contentEditable.value.innerText
  emit('update:modelValue', input.value);
};

</script>

<template>
  <div class="container flex justify-center items-center min-h-[150px] h-full" @click="focusContentEditable">
    <div id="contentEditable" ref="contentEditable" :contenteditable="!readOnly"
      class="text-center w-full outline-none relative before:text-white/70 whitespace-pre-line"
      :class="{ 'before:hidden': input.length }" :style="{ '--placeholder': props.placeholder, 'font-size': fontSize }">{{
        modelValue }}</div>
  </div>
</template>

<style lang="scss" scoped>
.container div::before {
  content: var(--placeholder);
  width: 100%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}
</style>