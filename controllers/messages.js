let mongoose = require('mongoose');
let messageModel = require('../schemas/messages');

module.exports = {
  // Lấy tất cả message giữa 2 users
  GetMessagesBetweenUsers: async (fromUserId, toUserId) => {
    try {
      let messages = await messageModel.find({
        $or: [
          { from: fromUserId, to: toUserId, isDeleted: false },
          { from: toUserId, to: fromUserId, isDeleted: false }
        ]
      })
      .sort({ createdAt: 1 })
      .populate('from', 'username fullName avatarUrl')
      .populate('to', 'username fullName avatarUrl');
      return messages;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Tạo message mới
  CreateMessage: async (from, to, messageContent) => {
    try {
      let newMessage = new messageModel({
        from,
        to,
        messageContent
      });
      let saved = await newMessage.save();
      let populated = await messageModel.findById(saved._id)
        .populate('from', 'username fullName avatarUrl')
        .populate('to', 'username fullName avatarUrl');
      return populated;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  // Lấy message cuối cùng của mỗi user mà user hiện tại đã nhắn tin
  GetLastMessagesFromEachUser: async (currentUserId) => {
    try {
      // Tìm tất cả các user đã nhắn tin với user hiện tại
      let messages = await messageModel.aggregate([
        {
          $match: {
            $or: [
              { from: mongoose.Types.ObjectId(currentUserId), isDeleted: false },
              { to: mongoose.Types.ObjectId(currentUserId), isDeleted: false }
            ]
          }
        },
        {
          $sort: { createdAt: -1 }
        },
        {
          $group: {
            _id: {
              $cond: {
                if: { $eq: ['$from', mongoose.Types.ObjectId(currentUserId)] },
                then: '$to',
                else: '$from'
              }
            },
            lastMessage: { $first: '$$ROOT' }
          }
        },
        {
          $replaceRoot: { newRoot: '$lastMessage' }
        }
      ]);

      // Populate thông tin user
      let populatedMessages = await messageModel.populate(messages, [
        { path: 'from', select: 'username fullName avatarUrl' },
        { path: 'to', select: 'username fullName avatarUrl' }
      ]);

      return populatedMessages;
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
