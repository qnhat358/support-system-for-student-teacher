<script setup>
import { storeToRefs } from "pinia";
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useUserStore } from "../stores/user";
import { formatDateString } from "@/utils/utils";
import moment from "moment";

const { user } = storeToRefs(useAuthStore());
const { updateUserById } = useUserStore();
const formData = ref({});

const isEditing = ref(false);

function handleClick () {
  console.log(formData.value.avatar_url);
  document.getElementsByClassName("fileInput")[0].click();
}

async function handleFileSelect (event) {
  const file = event.target.files[0];
  formData.value.avatar_url = URL.createObjectURL(file);
  const editFormData = new FormData();
  editFormData.append('file', file);
  editFormData.append('upload_preset', 'm1cueo4o');
  try {
    const response = await fetch('https://api.cloudinary.com/v1_1/qnhat358/image/upload', {
      method: 'POST',
      body: editFormData
    });

    const result = await response.json();
    formData.value.avatar_url = result.url;
    event.target.value = ''
  } catch (error) {
    console.error(error);
  }
}

const edit = () => {
  formData.value = {
    fullname: user.value.fullname,
    phone: user.value.phone,
    birthday: moment(user.value.birthday).format('YYYY-MM-DD'),
    avatar_url: user.value.avatar_url ?? null,
  };
  isEditing.value = true;
}

const save = async () => {
  await updateUserById({
    fullname: formData.value.fullname ?? null,
    phone: formData.value.phone ?? null,
    birthday: formData.value.birthday ?? null,
    avatar_url: formData.value.avatar_url ?? null,
  })
  isEditing.value = false;
}

</script>

<template>
  <div class="container xl:max-w-6xl mx-auto px-4 py-6 mt-20">
    <div class="mx-auto">
      <div class="flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg">
        <div class="px-6 flex flex-col lg:flex-row">
          <div class="flex flex-wrap justify-center">
            <div class="w-full px-4 flex justify-center">
              <div v-if="!isEditing" class="relative">
                <img v-if="user.avatar_url" :src="user.avatar_url"
                  class="shadow-xl rounded-full h-auto border-none -m-16 lg:m-8 max-w-[150px] lg:max-w-[300px]" />
                <img v-else src="@assets/images/avatar.jpg"
                  class="shadow-xl rounded-full h-auto border-none -m-16 lg:m-8 max-w-[150px] lg:max-w-[300px]" />
              </div>
              <div v-else class="relative">
                <img v-if="formData.avatar_url" :src="formData.avatar_url"
                  class="shadow-xl rounded-full h-auto border-none -m-16 lg:m-8 max-w-[150px] lg:max-w-[300px] cursor-pointer"
                  @click="handleClick" />
                <img v-else src="@assets/images/avatar.jpg"
                  class="shadow-xl rounded-full h-auto border-none -m-16 lg:m-8 max-w-[150px] lg:max-w-[300px] cursor-pointer"
                  @click="handleClick" />
                <input class="fileInput" type="file" style="display: none;" @change="handleFileSelect($event)">
              </div>
            </div>
          </div>
          <div class="text-center lg:text-left mt-20 lg:mt-10 mx-auto">
            <h3 class="text-4xl font-semibold leading-normal text-gray-800 mb-5">
              {{ user.username }}
            </h3>
            <div class="mb-4 text-2xl">
              <span>Fullname: <span v-if="!isEditing">{{ user.fullname }}</span>
                <input v-else type="text" v-model="formData.fullname">
              </span>
            </div>
            <div class="mb-4 text-2xl">
              <span>Phone number: <span v-if="!isEditing">{{ user.phone }}</span>
                <input v-else type="text" name="" id="" v-model="formData.phone">
              </span>
            </div>
            <div class="mb-4 text-2xl">
              <span>Date of birth: <span v-if="!isEditing">{{ formatDateString(user.birthday) }}</span>
                <input v-else type="date" name="" id="" v-model="formData.birthday">
              </span>
            </div>
            <div class="mb-4 text-2xl">
              <span>Role: <span>{{ user.type.charAt(0).toUpperCase() + user.type.slice(1) }}</span>
              </span>
            </div>
            <button v-if="!isEditing" @click="edit"
              class="bg-black active:bg-[var(--primary)] uppercase text-white font-bold hover:shadow-md shadow text-xs px-10 py-2 rounded outline-none focus:outline-none sm:mr-2 my-10"
              type="button" style="transition: all 0.15s ease 0s">
              Edit
            </button>
            <template v-else>
              <button @click="isEditing = false"
                class="active:bg-black bg-[var(--primary)] uppercase text-white font-bold hover:shadow-md shadow text-xs px-10 py-2 rounded outline-none focus:outline-none sm:mr-2 my-10"
                type="button" style="transition: all 0.15s ease 0s">
                Cancel
              </button>
              <button @click="save"
                class="active:bg-black bg-[var(--second)] uppercase text-white font-bold hover:shadow-md shadow text-xs px-10 py-2 rounded outline-none focus:outline-none sm:mr-2 my-10"
                type="button" style="transition: all 0.15s ease 0s">
                Save
              </button>
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
