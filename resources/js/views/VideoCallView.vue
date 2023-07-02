<template>
  <div class="bg-black aspect-[4/3] fixed w-[100vw] h-[100vh] z-[9999] top-0 left-0">
    <button @click="startCall" v-if="!showLocalVideo"
      class="absolute z-50 bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-gray-500 p-4 text-white">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-7 h-7">
        <path stroke-linecap="round"
          d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25h-9A2.25 2.25 0 002.25 7.5v9a2.25 2.25 0 002.25 2.25z" />
      </svg>
    </button>
    <button v-else @click="endCall"
      class="absolute z-50 bottom-10 left-1/2 -translate-x-1/2 rounded-full bg-gray-500 p-4 text-white hover:bg-red-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15.75 10.5l4.72-4.72a.75.75 0 011.28.53v11.38a.75.75 0 01-1.28.53l-4.72-4.72M12 18.75H4.5a2.25 2.25 0 01-2.25-2.25V9m12.841 9.091L16.5 19.5m-1.409-1.409c.407-.407.659-.97.659-1.591v-9a2.25 2.25 0 00-2.25-2.25h-9c-.621 0-1.184.252-1.591.659m12.182 12.182L2.909 5.909M1.5 4.5l1.409 1.409" />
      </svg>
    </button>
    <video v-show="showLocalVideo" ref="localVideo" autoplay class="absolute bottom-0 right-0 w-1/4"></video>
    <img v-if="!showLocalVideo" src="@assets/images/Video-Placeholder.png"
      class="absolute bottom-0 right-0 w-1/4 border-2 border-black" />
    <video v-show="showRemoteVideo" ref="remoteVideo" class="w-full" autoplay></video>
    <img v-if="!showRemoteVideo" src="@assets/images/Video-Placeholder.png" class="w-full h-full border-2 border-black" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import io from 'socket.io-client';
import SimplePeer from 'simple-peer';
import { useVideoCallStore } from "../stores/videoCall";
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";

const { videoCallRoomId, callerName, avatar } = storeToRefs(useVideoCallStore());
const { user } = storeToRefs(useAuthStore());

const socket = ref(null);
const localVideo = ref(null);
const showLocalVideo = ref(false);
const remoteVideo = ref(null);
const showRemoteVideo = ref(false);
const peers = {};
let peer;
const localStream = ref(null);
const emit = defineEmits(["close"]);
const remotePeer = ref(null)
const startCall = async () => {
  try {
    if (!localStream.value) {
      await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: false
      }).then((stream) => {
        localStream.value = stream;
      })
    }
    localVideo.value.srcObject = localStream.value;
    showLocalVideo.value = true;
    peer = new SimplePeer({
      initiator: true,
      stream: localStream.value,
      trickle: false,
    });

    // remotePeer.value.addStream(localStream.value)
    peer.on('signal', (signal) => {
      console.log('signal');
      socket.value.emit('call', {
        signal, 
        callerId: user.value.id,
        callerName: user.value.fullname,
        avatar: user.value.avatar_url
      });
    });

    peer.on('close', () => {
      console.log('close');
      socket.value.emit('leaveVideoCallRoom')
      if (peers[socket.value.id] === peer) {
        delete peers[socket.value.id];
      }
      if (remotePeer.value) {
        remotePeer.value.destroy();
      }
    });

    socket.value.on('userLeft', (data) => {
      peer.destroy();
    })

    socket.value.on('answer', (data) => {
      console.log('answer');
      peer.signal(data);
    });
  } catch (error) {
    console.error('Error accessing media devices:', error);
  }
};

const endCall = () => {
  // Stop local stream
  if (localStream.value) {
    localStream.value.getTracks().forEach(track => track.stop());
    localStream.value = null;
  }
  // Close the peer connection
  if (remotePeer.value) {
    remotePeer.value.destroy();
    remotePeer.value = null;
    peer = null;
  }

  socket.value.emit('leaveVideoCallRoom');
  emit('close');
}

onMounted(async () => {
  socket.value = io('http://127.0.0.1:3000');
  socket.value.on('call', async (data) => {
    callerName.value = data.callerName;
    avatar.value = data.avatar
    try {
      if (!localStream.value) {
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: false
        }).then((stream) => {
          localStream.value = stream;
        })
      }
      remotePeer.value = new SimplePeer({
        initiator: false,
        stream: localStream.value,
        trickle: false,
      });

      remotePeer.value.on('signal', (signalData) => {
        console.log('remote signal');
        socket.value.emit('answer', signalData);
      });

      remotePeer.value.on('stream', (stream) => {
        console.log('remote stream');
        showRemoteVideo.value = true;
        remoteVideo.value.srcObject = stream;
      });

      remotePeer.value.on('close', () => {
        if (remotePeer.value) {
          remotePeer.value.destroy();
        }
      });
      console.log('remote call');
      remotePeer.value.signal(data.signal);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  });
});

defineExpose({
  startCall,
});
</script>
