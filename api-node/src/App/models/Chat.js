const mongoose = require('../../database');

const ChatSchema = new mongoose.Schema({
    messages: [{
        datetime: {
            type: Date,
            default: Date.now
        },
        message: {
            type: String,
        },
        originId: {
            type: String,
        }
    }],
    users: [{
        type: String,
        require: true,
    }]
});

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat;