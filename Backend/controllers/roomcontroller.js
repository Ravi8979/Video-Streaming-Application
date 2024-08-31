const Room = require('../models/Room');

exports.createRoom = async (req, res) => {
    const { roomId } = req.body;
    const room = new Room({ roomId, users: [] });
    await room.save();
    res.status(201).json(room);
};

exports.joinRoom = async (req, res) => {
    const { roomId, user } = req.body;
    const room = await Room.findOne({ roomId });
    if (room) {
        room.users.push(user);
        await room.save();
        res.status(200).json(room);
    } else {
        res.status(404).json({ message: 'Room not found' });
    }
};
