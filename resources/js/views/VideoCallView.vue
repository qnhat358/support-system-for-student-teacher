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
    <button @click="toggleMic"
      class="absolute z-50 top-10 left-1/2 -translate-x-1/2 rounded-full bg-gray-500 p-4 text-white">
      <svg v-if="enableMic" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M6 12c0-2.209 1.791-4 4-4s4 1.791 4 4m-8 0a4 4 0 108 0m-8 0h8" />
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M15 10v2a3 3 0 01-3 3H9a3 3 0 01-3-3v-2m6 0h2m-2 0a2 2 0 100-4m0 4a2 2 0 100-4M9 10H7m2 0a2 2 0 110-4m0 4a2 2 0 110-4" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    </button>

    <button @click="toggleVideo"
      class="absolute z-50 top-20 left-1/2 -translate-x-1/2 rounded-full bg-gray-500 p-4 text-white">
      <svg v-if="enableVideo" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 11a2 2 0 114 0 2 2 0 01-4 0z" />
        <path stroke-linecap="round" stroke-linejoin="round"
          d="M20 9.8V4a2 2 0 00-2-2H6a2 2 0 00-2 2v5.8M6 21h12a2 2 0 002-2V4a2 2 0 00-2-2H6a2 2 0 00-2 2v15a2 2 0 002 2z" />
      </svg>
      <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
        stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    </button>
    <video v-show="showLocalVideo" ref="localVideo" autoplay class="absolute bottom-0 right-0 w-1/4"></video>
    <img v-if="!showLocalVideo" src="@assets/images/Video-Placeholder.png"
      class="absolute bottom-0 right-0 w-1/4 border-2 border-black" />
    <video v-show="showRemoteVideo" ref="remoteVideo" class="w-full"></video>
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
import { BE_BASE_URL } from "@/utils/constants";

const { videoCallRoomId, callerName, avatar } = storeToRefs(useVideoCallStore());
const { user } = storeToRefs(useAuthStore());

const socket = ref(null);
const localVideo = ref(null);
const showLocalVideo = ref(false);
const remoteVideo = ref(null);
const showRemoteVideo = ref(false);
const enableMic = ref(true);
const enableVideo = ref(true);
const peers = {};
let peer;
const localStream = ref(null);
const emit = defineEmits(["close"]);
const remotePeer = ref(null)

const toggleMic = () => {
  enableMic.value = !enableMic.value;
  if (localStream.value) {
    const audioTracks = localStream.value.getAudioTracks();
    if (audioTracks.length > 0) {
      audioTracks[0].enabled = enableMic.value;
    }
  }
};

const toggleVideo = () => {
  enableVideo.value = !enableVideo.value;
  if (localStream.value) {
    const videoTracks = localStream.value.getVideoTracks();
    if (videoTracks.length > 0) {
      videoTracks[0].enabled = enableVideo.value;
    }
  }
};

const startCall = async () => {
  try {
    if (!localStream.value) {
      await navigator.mediaDevices.getUserMedia({
        video: enableVideo.value,
        audio: enableMic.value
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
        roomId: videoCallRoomId.value,
        callerId: user.value.id,
        callerName: user.value.fullname,
        avatar: user.value.avatar_url
      });
    });

    peer.on('close', () => {
      console.log('close');
      // socket.value.emit('leaveVideoCallRoom')
      // // Stop local stream
      // if (localStream.value) {
      //   localStream.value.getTracks().forEach(track => track.stop());
      //   localStream.value = null;
      // }
      // // Close the peer connection
      // if (remotePeer.value) {
      //   remotePeer.value.destroy();
      //   remotePeer.value = null;
      //   peer = null;
      // }
      emit('close');
    });

    socket.value.on('close', ()=>{
      emit('close');
    })

    socket.value.on('userLeft', (data) => {
      // Stop local stream
      console.log('userLeft');
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
  socket.value = io(BE_BASE_URL);
  socket.value.on('call', async (data) => {
    callerName.value = data.callerName;
    avatar.value = data.avatar
    try {
      if (!localStream.value) {
        await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true
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

      remotePeer.value.on('stream', async (stream) => {
        console.log('remote stream');
        remoteVideo.value.srcObject = await stream;
        await remoteVideo.value.play();
        showRemoteVideo.value = true;
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
