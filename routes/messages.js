var express = require("express");
var router = express.Router();
let messageController = require('../controllers/messages');
let { CheckLogin } = require('../utils/authHandler');

// GET /api/v1/messages/:userId - Lấy tất cả message giữa user hiện tại và userId
router.get("/:userId", CheckLogin, async function (req, res, next) {
  try {
    let currentUserId = req.user._id;
    let targetUserId = req.params.userId;

    let messages = await messageController.GetMessagesBetweenUsers(currentUserId, targetUserId);
    res.send(messages);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// POST /api/v1/messages - Gửi message mới
router.post("/", CheckLogin, async function (req, res, next) {
  try {
    let from = req.user._id;
    let { to, messageContent } = req.body;

    // Validate
    if (!to) {
      return res.status(400).send({ message: "to is required" });
    }
    if (!messageContent) {
      return res.status(400).send({ message: "messageContent is required" });
    }
    if (!messageContent.type || !['file', 'text'].includes(messageContent.type)) {
      return res.status(400).send({ message: "messageContent.type must be 'file' or 'text'" });
    }
    if (messageContent.text === undefined || messageContent.text === null) {
      return res.status(400).send({ message: "messageContent.text is required" });
    }

    let newMessage = await messageController.CreateMessage(from, to, messageContent);
    res.status(201).send(newMessage);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// GET /api/v1/messages/ - Lấy message cuối cùng của mỗi user
router.get("/", CheckLogin, async function (req, res, next) {
  try {
    let currentUserId = req.user._id;
    let messages = await messageController.GetLastMessagesFromEachUser(currentUserId);
    res.send(messages);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
