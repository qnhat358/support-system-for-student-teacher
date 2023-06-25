const ChatRepository = require("../repositories/ChatRepository");

class ChatService {
  async create(roomId, senderId, senderName, message) {
    return await ChatRepository.create(roomId, senderId, senderName, message);
  }
  async getAllUsersHaveChatted(userId) {
    return await ChatRepository.getAllUsersHaveChatted(userId);
  }
  async getRoomId(roomName) {
    let roomId = await ChatRepository.getRoomId(roomName);
    let messages = [];
    if (roomId != 0) {
      messages = await ChatRepository.getMessage(roomId);
      return {roomId, messages};
    }
    else {
      roomId = await ChatRepository.createRoom(roomName);
      return {roomId, messages}
    }
  }
}
module.exports = new ChatService();
