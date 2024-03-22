const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  message: { type: String, required: true },
  time: { type: Date, required: true },
});

module.exports = mongoose.model('Message', messageSchema);
