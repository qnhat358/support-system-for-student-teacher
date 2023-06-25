<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue';
import algoliasearch from 'algoliasearch';
import io from 'socket.io-client';
import { useChatStore } from "../stores/chat";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";
import moment from 'moment';

const { user } = storeToRefs(useAuthStore());
const { getRoomId, getAllUsersHaveChatted } = useChatStore();

const client = algoliasearch('VRAPD4WP8Z', 'c0eb070af85df0b558de57a0d4226a22');
const index = client.initIndex('easyQuiz');

const searchQuery = ref('');
const searchResults = ref([]);
const users = ref([]);
const chatUser = ref({});
const messages = ref([]);
const newMessage = ref('');
const roomId = ref(1);
const roomName = ref('');
const messageContainer = ref(null);
let socket = null;

function updateScroll(){
    var element = document.getElementById("message-container");
    element.scrollTop = element.scrollHeight;
    console.log('scrolled');
}

watch(searchQuery, async () => {
  if (searchQuery.value === '') {
    searchResults.value = users.value;
  } else {
    try {
      const response = await index.search(searchQuery.value);
      searchResults.value = response.hits;
    } catch (error) {
      console.error('Error searching users:', error);
    }
  }
});

// const isScrolledToBottom = computed(()=>{
//   let element = document.getElementById("message-container");
//   return element.scrollHeight - element.clientHeight <= element.scrollTop + 1;
// })

function scrollBottom() {
  messageContainer.value = document.getElementById("message-container")
  
  setInterval(function() {
      // allow 1px inaccuracy by adding 1
      const isScrolledToBottom = messageContainer.value.scrollHeight - messageContainer.value.clientHeight <= messageContainer.value.scrollTop + 1
      // scroll to bottom if isScrolledToBottom is true
      if (isScrolledToBottom) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight - messageContainer.value.clientHeight
      }
  }, 500)
}


const joinChatRoom = async (receiver) => {
  if (Object.keys(chatUser.value).length != 0) {
    console.log('leave');
    socket?.emit('leaveChat');
  }
  chatUser.value = receiver;
  roomName.value = padNumberWithZeros(user.value.id, chatUser.value.user_id);
  const response = await getRoomId(roomName.value);
  roomId.value = response.roomId;
  messages.value = response.messages.reverse();
  updateScroll();
  // setTimeout(updateScroll, 500);
  // scrollBottom();

  // Establish Socket.IO connection
  socket = io('http://127.0.0.1:3000');

  // Join the chat room
  socket.on('connect', () => {
    socket.emit('joinChat', roomId.value);
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

function padNumberWithZeros (input1, input2) {
  const paddedInput1 = input1.toString().padStart(4, '0'); // Convert input1 to a string and pad with leading zeros to a length of 4
  const paddedInput2 = input2.toString().padStart(4, '0'); // Convert input2 to a string and pad with leading zeros to a length of 4
  return paddedInput1 + paddedInput2; // Concatenate the padded inputs
}

onMounted(async () => {
  users.value = await getAllUsersHaveChatted(user.value.id);
  searchResults.value = users.value
})

onUnmounted(() => {
  
})
</script>

<template>
  <div class="w-full h-[calc(100vh-72px)]">
    <div class="flex border border-grey rounded shadow-lg h-full">
      <!-- Left -->
      <div class="w-1/4 border flex flex-col pt-2">
        <!-- Search -->
        <div class="py-2 px-2 bg-grey-lightest">
          <input type="text" class="w-full px-2 py-2 text-sm" placeholder="Search or start new chat"
            v-model="searchQuery" />
        </div>
        <!-- Contacts -->
        <div class="bg-grey-lighter flex-1 overflow-auto">
          <div v-for="user in searchResults" :key="user.objectID"
            class="px-3 flex items-center bg-grey-light cursor-pointer hover:backdrop-brightness-90"
            @click="joinChatRoom(user)">
            <div>
              <img class="h-12 w-12 rounded-full"
                src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" />
            </div>
            <div class="ml-4 flex-1 border-b border-grey-lighter py-4">
              <div class="flex items-bottom justify-between">
                <p class="text-grey-darkest">
                  {{ user.fullname }}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>


      <!-- Right -->
      <div v-show="Object.keys(chatUser).length" class="w-3/4 border flex flex-col">

        <!-- Header -->
        <div class="py-2 px-3 bg-grey-lighter flex flex-row justify-between items-center">
          <div class="flex items-center">
            <div>
              <img class="w-10 h-10 rounded-full"
                src="https://darrenjameseeley.files.wordpress.com/2014/09/expendables3.jpeg" />
            </div>
            <div class="ml-4">
              <p class="text-grey-darkest">
                {{ chatUser.fullname }}
              </p>
            </div>
          </div>

          <div class="flex">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#263238" fill-opacity=".5"
                  d="M15.9 14.3H15l-.3-.3c1-1.1 1.6-2.7 1.6-4.3 0-3.7-3-6.7-6.7-6.7S3 6 3 9.7s3 6.7 6.7 6.7c1.6 0 3.2-.6 4.3-1.6l.3.3v.8l5.1 5.1 1.5-1.5-5-5.2zm-6.2 0c-2.6 0-4.6-2.1-4.6-4.6s2.1-4.6 4.6-4.6 4.6 2.1 4.6 4.6-2 4.6-4.6 4.6z">
                </path>
              </svg>
            </div>
            <div class="ml-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#263238" fill-opacity=".5"
                  d="M1.816 15.556v.002c0 1.502.584 2.912 1.646 3.972s2.472 1.647 3.974 1.647a5.58 5.58 0 0 0 3.972-1.645l9.547-9.548c.769-.768 1.147-1.767 1.058-2.817-.079-.968-.548-1.927-1.319-2.698-1.594-1.592-4.068-1.711-5.517-.262l-7.916 7.915c-.881.881-.792 2.25.214 3.261.959.958 2.423 1.053 3.263.215l5.511-5.512c.28-.28.267-.722.053-.936l-.244-.244c-.191-.191-.567-.349-.957.04l-5.506 5.506c-.18.18-.635.127-.976-.214-.098-.097-.576-.613-.213-.973l7.915-7.917c.818-.817 2.267-.699 3.23.262.5.501.802 1.1.849 1.685.051.573-.156 1.111-.589 1.543l-9.547 9.549a3.97 3.97 0 0 1-2.829 1.171 3.975 3.975 0 0 1-2.83-1.173 3.973 3.973 0 0 1-1.172-2.828c0-1.071.415-2.076 1.172-2.83l7.209-7.211c.157-.157.264-.579.028-.814L11.5 4.36a.572.572 0 0 0-.834.018l-7.205 7.207a5.577 5.577 0 0 0-1.645 3.971z">
                </path>
              </svg>
            </div>
            <div class="ml-6">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path fill="#263238" fill-opacity=".6"
                  d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z">
                </path>
              </svg>
            </div>
          </div>
        </div>

        <!-- Messages -->
        <div id="message-container" class="flex-1 overflow-auto flex flex-col-reverse" style="background-color: #DAD3CC">
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
        <div class="bg-grey-lighter px-4 py-4 flex items-center">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
              <path opacity=".45" fill="#263238"
                d="M9.153 11.603c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962zm-3.204 1.362c-.026-.307-.131 5.218 6.063 5.551 6.066-.25 6.066-5.551 6.066-5.551-6.078 1.416-12.129 0-12.129 0zm11.363 1.108s-.669 1.959-5.051 1.959c-3.505 0-5.388-1.164-5.607-1.959 0 0 5.912 1.055 10.658 0zM11.804 1.011C5.609 1.011.978 6.033.978 12.228s4.826 10.761 11.021 10.761S23.02 18.423 23.02 12.228c.001-6.195-5.021-11.217-11.216-11.217zM12 21.354c-5.273 0-9.381-3.886-9.381-9.159s3.942-9.548 9.215-9.548 9.548 4.275 9.548 9.548c-.001 5.272-4.109 9.159-9.382 9.159zm3.108-9.751c.795 0 1.439-.879 1.439-1.962s-.644-1.962-1.439-1.962-1.439.879-1.439 1.962.644 1.962 1.439 1.962z">
              </path>
            </svg>
          </div>
          <div class="flex-1 mx-4">
            <input class="w-full border rounded px-2 py-2" v-model="newMessage" type="text"  @keyup.enter="sendMessage"/>
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
  </div>
</template>

<style lang="scss" scoped></style>