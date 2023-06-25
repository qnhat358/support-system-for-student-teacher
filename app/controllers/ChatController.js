const ChatService = require('../services/ChatService');
class ChatController {
  // [GET] /chats/
  async storeMessage(roomId, senderId, senderName, content) {
    try {
      const message = await ChatService.create(roomId, senderId, senderName, content);
      return message
    } catch (error) {
      console.log(error);
    }
  }
  // [GET] /chats/users
  async getAllUsersHaveChatted(req, res, next) {
    try {
      const response = await ChatService.getAllUsersHaveChatted(req.user.UserId);
      res.responseSuccess(response);
    } catch (error) {
      res.responseError(error);
    }
  }

  // [POST] /chats/roomId
  async getRoomId(req, res, next) {
    try {
      const {roomName} = req.body;
      const response = await ChatService.getRoomId(roomName);
      res.responseSuccess(response);
    } catch (error) {
      res.responseError(error);
    }
  }
}
module.exports = new ChatController();