const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    question: {
        en: { type: String, required: true },
        hi: { type: String },
        ta: { type: String }
    },
    options: [{
        text: { type: String, required: true },
        isCorrect: { type: Boolean, default: false }
    }],
    category: { type: String, required: true },
    difficulty: { type: String, enum: ['Easy', 'Medium', 'Hard'], default: 'Easy' },
    explanation: { type: String }
});

module.exports = mongoose.model('Quiz', QuizSchema);
