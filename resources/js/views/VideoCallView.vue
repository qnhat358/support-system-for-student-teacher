<template>
  <div>
    <h2>Video Call Room</h2>
    <div>
      <p v-for="user in users" :key="user">{{ user }}</p>
    </div>
    <div v-if="!isCalling">
      <button @click="startCall">Start Call</button>
    </div>
    <div v-else>
      <button @click="endCall">End Call</button>
      <div>
        <video ref="localVideo" autoplay></video>
        <div v-for="userId in users" :key="userId">
          <video v-if="userId != user?.id" :id="`remoteVideo-${userId}`" autoplay></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import io from 'socket.io-client';
import Peer from 'simple-peer';
import { useAuthStore } from "../stores/auth";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";

const route = useRoute();
const { user } = storeToRefs(useAuthStore());

const roomId = ref(null);
const socket = io('http://127.0.0.1:3000');
const users = ref(new Set());
const remoteUsers = ref([]);
const localVideo = ref(null);
const isCalling = ref(false);
let localStream;
const peers = new Map();


socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('userJoined', (userId) => {
  console.log(userId);
  users.value.add(userId);
  console.log(users.value);
  createPeer(userId, null);
});

socket.on('userLeft', (userId) => {
  console.log('left');
  users.value.delete(userId);
  const peer = peers.get(userId);
  if (peer) {
    peer.destroy();
    peers.delete(userId);
  }
});

const startCall = () => {
  isCalling.value = true;
  socket.emit('joinVideoCallRoom', {userId: user.value.id, roomId: roomId.value});

  // Set up local video stream
  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then((stream) => {
      localVideo.value.srcObject = stream;
      localStream = stream;
      
      // Create a Simple Peer instance for each remote user
      for (const userId of users.value) {
        createPeer(userId, stream);
      }
    })
    .catch((error) => {
      console.error('Error accessing media devices:', error);
    });
};

const createPeer = (userId, stream) => {
  console.log(route.query.id == 1);
  const peer = new Peer({ initiator: route.query.id == 1, stream: stream, trickle: false })
  
  // Event handlers for Simple Peer
  peer.on('signal', (signal) => {
    console.log('signal');
    // Emit the call signal to the server
    socket.emit('callSignal', { userId, roomId: roomId.value, signal });
  });
  
  peer.on('stream', (stream) => {
    console.log('stream');
    // Handle the remote stream and display the video
    console.log(userId);
    const remoteVideo = document.getElementById(`remoteVideo-${userId}`);
    remoteVideo.srcObject = stream;
  });

  peer.on('close', () => {
    // Clean up resources when the peer connection is closed
    console.log('close');
    peer.destroy();
    delete remoteStreams[userId];
  });

  // Store the peer instance
  peers.set(userId, peer);
};

const endCall = () => {
  console.log('end call');
  isCalling.value = false;
  socket.emit('leaveVideoCallRoom');

  // Clean up resources
  for (const peer of peers.values()) {
    peer.destroy();
  }
  localStream.getTracks().forEach((track) => track.stop());
};

// Register socket event handler for receiving call signals
socket.on('callSignal', ({ userId, signal }) => {
  // Handle the call signal received from the server
  console.log('callSignal');
  const peer = peers.get(userId);
  if (peer) {
    peer.signal(signal);
  } else {
    createPeer(userId, localStream);
    peer.signal(signal);
  }
});

onMounted(() => {
  // Generate a unique room ID
  roomId.value = 1;

  // Join the video call room
  socket.emit('joinVideoCallRoom', { userId: user.value.id, roomId: roomId.value });
  // Event handler for receiving the initial user list
  socket.on('initialUsers', (userList) => {
    for (const userId of userList) {
      users.value.add(userId);
      createPeer(userId, localStream);
    }
  });
});
</script>
