const DB = require('../../config/database.js');
class ChatRepository {
  async getMessage (roomId) {
    const result = await DB.executeQuery('SELECT * FROM chat_messages WHERE room_id = $1 ORDER BY created_at ASC',
      [roomId]);
    return result;
  }

  async create (roomId, senderId, senderName, message) {
    const query = 'INSERT INTO chat_messages (room_id, sender_id, sender_name, content) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [roomId, senderId, senderName, message]
    const result = await DB.executeQuery(query, values);
    return result[0];
  }

  async getRoomId (roomName) {
    const query = `
      SELECT id
      FROM chat_rooms
      WHERE name = $1 OR name = $2
      LIMIT 1
    `;
    const values = [roomName, reverseChatRoomName(roomName)]
    const result = await DB.executeQuery(query, values);
    if (!result.length) return 0;
    else return result[0].id;
  }

  async createRoom (roomName) {
    const query = `
      INSERT INTO chat_rooms (name) VALUES ($1) RETURNING id
    `;
    const values = [roomName]
    const result = await DB.executeQuery(query, values);
    return result[0].id;
  }

  async getAllUsersHaveChatted (userId) {
    const query = `
    SELECT DISTINCT u.*
    FROM users u
    JOIN chat_rooms cr ON ((u.id = SUBSTRING(cr.name, 1, 4)::INTEGER AND $1 = SUBSTRING(cr.name, 5, 4)::INTEGER)
				                OR (u.id = SUBSTRING(cr.name, 5, 4)::INTEGER AND $1 = SUBSTRING(cr.name, 1, 4)::INTEGER))
    `;
    const values = [userId]
    const result = await DB.executeQuery(query, values);
    console.log(result);
    return result.map(user => {
      return {
        user_id: user.id,
        fullname: user.fullname,
        avatar_url: user.avatar_url
      }
    });
  }


}

// Function to reverse the chat room name
const reverseChatRoomName = (chatRoomName) => {
  const senderId = chatRoomName.slice(0, 4);
  const receiverId = chatRoomName.slice(4);
  return receiverId + senderId;
};
module.exports = new ChatRepository();


