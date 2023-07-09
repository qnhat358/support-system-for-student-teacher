<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { storeToRefs } from "pinia";
import { useExamStore } from "@/stores/exam.js";
import { useRoute } from "vue-router";
import io from 'socket.io-client';
import { useChatStore } from "../stores/chat";
import { useAuthStore } from "../stores/auth";
import { toHHMMstring, toISOdate } from "../composables/dateTimeConvert";
import moment from 'moment';
import { BE_BASE_URL } from "@/utils/constants";
const route = useRoute();

const { exam } = storeToRefs(useExamStore());
const { fetchExamById } = useExamStore();
const { user } = storeToRefs(useAuthStore());
const { getRoomId } = useChatStore();

let socket = null;
const roomName = ref('');
const roomId = ref('');
const messages = ref([]);
const newMessage = ref('');
const users = ref([]);
function updateScroll () {
  var element = document.getElementById("message-container");
  element.scrollTop = element.scrollHeight;
}

const joinChatRoom = async () => {
  roomName.value = id.value.toString().padStart(8, '0');;
  const response = await getRoomId(roomName.value);
  roomId.value = response.roomId;
  messages.value = response.messages.reverse();
  updateScroll();

  // Establish Socket.IO connection
  socket = io(BE_BASE_URL);

  // Join the chat room
  socket.on('connect', () => {
    socket.emit('joinChatRoom', { user: user.value, roomId: roomId.value });
  });

  socket.on('userJoined', (userId) => {
    users.value.push(userId);
  });

  socket.on('userLeft', (user) => {
    console.log('left');
    users.value = users.value.filter(item =>item.id != user.id);
    console.log(users.value);
  });

  // Listen for new messages
  socket.on('newMessage', (message) => {
    messages.value.unshift(message);
  });
}

const sendMessage = () => {
  // Emit the message to the server
  socket.emit('sendMessage', {
    roomId: roomId.value,
    content: newMessage.value,
    senderId: user.value.id,
    senderName: user.value.fullname
  });

  // Clear the input field
  newMessage.value = '';
};

const id = ref('');
onMounted(async () => {
  id.value = route.query.id;
  await fetchExamById(id.value);
  await joinChatRoom();
  socket.on('initialUsers', (userList) => {
    for (const user of userList) {
      users.value.push(user);
    }
    console.log(users.value);
  });
})
onUnmounted(() => {
  socket.emit('leaveChatRoom');
  console.log('leave');
})
</script>

<template>
  <div class="container mx-auto px-4 py-6 mb-56 flex flex-col">
    <div class="flex-row flex gap-5 h-96">
      <div class="w-[50%] rounded-xl bg-white p-8 shadow-md flex flex-col items-start justify-between text-xl gap-10">
        <div>
          <span class="font-semibold">Exam name: </span> {{ exam.name }}
        </div>
        <div>
          <span class="font-semibold">Exam date: </span> {{ toISOdate(exam.date) }}
        </div>
        <div>
          <span class="font-semibold">Exam start: </span> {{ toHHMMstring(exam.start) }}
        </div>
        <div>
          <span class="font-semibold">Exam end: </span> {{ toHHMMstring(exam.end) }}
        </div>
      </div>
      <div
        class="w-[30%] rounded-xl bg-white shadow-md flex flex-col justify-start items-center border-2 border-[var(--third)]">
        <div class="border-2 rounded-t-xl bg-[var(--second)] w-full p-2 flex justify-center">
          <p class="text-xl font-bold">Active Users</p>
        </div>
        <div class="cursor-context-menu">
          <p v-for="user in users">{{ user.fullname }}</p>
        </div>
      </div>
      <div
        class="w-full rounded-xl bg-white shadow-md flex flex-col justify-start items-center border-2 border-[var(--third)]">
        <div class="border-2 rounded-t-xl bg-[var(--second)] w-full p-2 flex justify-center">
          <p class="text-xl font-bold">Chat</p>
        </div>

        <!-- Messages -->
        <div id="message-container" class="flex-1 overflow-auto flex flex-col-reverse bg-slate-300 w-full">
          <div class="py-2 px-3 flex flex-col-reverse">
            <div v-for="(message, index) in messages" :key="index">
              <div class="flex mb-2" :class="{ 'justify-end': message?.sender_id == user?.id }">
                <div class="rounded py-2 px-3"
                  :style="message?.sender_id == user?.id ? 'background-color: #E2F7CB;' : 'background-color: #F2F2F2'">
                  <p class="text-sm text-purple" v-if="message?.sender_id !== user?.id">
                    {{ message?.sender_name }}
                  </p>
                  <p class="text-sm mt-1">
                    {{ message?.content }}
                  </p>
                  <p class="text-right text-xs text-grey-dark mt-1">
                    {{ moment(message?.created_at).format('hh:mm') }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Input -->
        <div class="bg-grey-lighter px-4 py-4 flex items-center w-full">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path opacity=".45" fill="#263238"
                d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z">
              </path>
            </svg>
          </div>
          <div class="flex-1 mx-4">
            <input class="w-full border rounded px-2 py-2" v-model="newMessage" type="text" @keyup.enter="sendMessage" />
          </div>
          <div @click="sendMessage">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
              stroke="currentColor" class="w-6 h-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <router-link :to="{ name: 'joinTest', query: { id } }"
      class="mt-10 w-[300px] p-2 bg-white text-[var(--primary)] text-2xl font-bold rounded-lg border border-[var(--primary)] shadow-lg self-center text-center">
      Start
    </router-link>
  </div>
</template>

<style lang="scss" scoped></style>
