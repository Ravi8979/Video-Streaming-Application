const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    roomId: { type: String, required: true },
    users: [String],
});

module.exports = mongoose.model('Room', RoomSchema);
