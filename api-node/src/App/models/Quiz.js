const mongoose = require('../../database');

const QuizSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true,
    },
    question: {
        type: String,
        require: true,
    },
    answer: {
        type: String,
        require: true,
    },

});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = Quiz;