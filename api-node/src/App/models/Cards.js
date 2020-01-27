const mongoose = require('../../database');

const CardSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
    },
    type: {
        type: String,
        require: true,
    },
    description: {
        type: String,
    },
    link: {
        type: String,
    },
    image: {
        type: String,
    }
});

const Card = mongoose.model('Card', CardSchema);

module.exports = Card;

