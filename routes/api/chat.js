const express = require('express');
const router = express.Router();

const chatController = require('../../app/controllers/ChatController');

router.post('/roomId', chatController.getRoomId);
router.get('/users', chatController.getAllUsersHaveChatted);

module.exports = router;