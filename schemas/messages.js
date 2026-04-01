let mongoose = require('mongoose');

let messageSchema = mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  messageContent: {
    type: {
      type: String,
      enum: ['file', 'text'],
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = new mongoose.model('message', messageSchema);
