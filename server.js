const path = require("path");
const express = require("express");
const cookieParser = require("cookie-parser");
const apiRouter = require("./routes/api");
const cors = require("cors");
const dotenv = require("dotenv").config();
const handleResponse = require("./app/middlewares/handleResponse");
const chatController = require('./app/controllers/ChatController')
const UserService = require('./app/services/UserService')
const http = require('http');
const socketIO = require('socket.io');


const app = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://127.0.0.1:3001", // replace with your origin
    credentials: true, // enable credentials
  })
);
app.use(cookieParser());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
// app.use(formatErrorResponse)
app.use(handleResponse)
app.use(express.static('public'));
app.use('/api', apiRouter);

const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: '*' } });

//Video call
const videoCallRooms = new Map();

// Socket.IO connection
io.on('connection', (socket) => {
  console.log('A user connected');

  // chat
  socket.on('joinChatRoom', (data) => {
    let {user, roomId} = data;
    socket.join(roomId);
    socket.roomId = roomId;
    socket.user = user;
    console.log(`User joined the chat room ${roomId}`);
    if (!videoCallRooms.has(roomId)) {
      videoCallRooms.set(roomId, new Set());
    }
    if (!Array.from(videoCallRooms.get(roomId)).some(roomUser => roomUser.id == user.id))
    videoCallRooms.get(roomId).add(user);

    // Emit initial user list to the newly joined user
    let userList = Array.from(videoCallRooms.get(roomId));
    socket.emit('initialUsers', userList);

    // Notify other users in the room about the new user
    socket.to(roomId).emit('userJoined', user);
  });

  socket.on('joinChat', (roomId) => {
    socket.join(roomId);
    socket.roomId = roomId;
    console.log(`User joined the chat room ${roomId}`);
  });

  socket.on('sendMessage', (data) => {
    const { roomId, content, senderId, senderName } = data;

    // Store the message in the database (PostgreSQL)
    chatController.storeMessage(roomId, senderId, senderName, content)
      .then((savedMessage) => {
        // Emit the new message to all clients in the chat room
        io.to(roomId).emit('newMessage', { ...savedMessage, sender_name: senderName });
      })
      .catch((error) => {
        console.error('Error storing message:', error);
      });
    console.log(data);
  });

  socket.on('leaveChat', () => {
    const { roomId } = socket;
      socket.leave(roomId);
    }
  );
  // Leave a video call room
  socket.on('leaveChatRoom', () => {
    const { user, roomId } = socket;
    if (roomId && videoCallRooms.has(roomId)) {
      const userSet = videoCallRooms.get(roomId);
      userSet.forEach(item => {
        if ( item.id == user.id ){
          userSet.delete(item);
        }
      })
      console.log(videoCallRooms);
      socket.to(roomId).emit('userLeft', user);
      socket.leave(roomId);
    }
  });

  //video call
  // Join a video call room
  socket.on('joinVideoCallRoom', (data) => {
    console.log('join');
    console.log(data);
    const { userId, roomId } = data;
    socket.join(roomId);
    socket.userId = userId;
    socket.roomId = roomId;

    if (!videoCallRooms.has(roomId)) {
      videoCallRooms.set(roomId, new Set());
    }

    videoCallRooms.get(roomId).add(userId);

    // Emit initial user list to the newly joined user
    const userList = Array.from(videoCallRooms.get(roomId));
    socket.emit('initialUsers', userList);

    // Notify other users in the room about the new user
    socket.to(roomId).emit('userJoined', userId);
  });

  // Handle call signals
  socket.on('callSignal', ({ userId, roomId, signal }) => {
    // Relay the call signal to the recipient user in the same room
    socket.to(roomId).emit('callSignal', { userId, signal });
  });

  // Leave a video call room
  socket.on('leaveVideoCallRoom', () => {
    const { userId, roomId } = socket;
    console.log(userId);
    if (roomId && videoCallRooms.has(roomId)) {
      videoCallRooms.get(roomId).delete(userId);
      socket.to(roomId).emit('userLeft', userId);
      socket.leave(roomId);
    }
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.userId);

    // If the user was in a video call room, remove them from the room
    const { userId, roomId } = socket;
    if (roomId && videoCallRooms.has(roomId)) {
      videoCallRooms.get(roomId).delete(userId);
      socket.to(roomId).emit('userLeft', userId);
    }
  });

});

server.listen(port, () => {
  console.log(`Production server running at http://localhost:${port}`);
});
// if (process.env.NODE_ENV === 'development') {
//   const vite = require('vite');
//   const config = require('./vite.config');
//   (async () => {
//     const viteServer = await vite.createServer(config);
//     app.use(apiRouter);
//     app.use(viteServer.middlewares);
//     app.listen(port, () => {
//       console.log(`Vite development server running at http://localhost:${port}`);
//     });
//   })();
// } else {
// }