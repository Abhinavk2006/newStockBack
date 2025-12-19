const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
    title: { type: String, required: true },
    category: { type: String, required: true }, // e.g., 'Basics', 'Technical Analysis'
    content: {
        en: { type: String, required: true },
        hi: { type: String }, // Hindi
        ta: { type: String }, // Tamil
        // Add other languages as needed
    },
    difficulty: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], default: 'Beginner' },
    order: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Lesson', LessonSchema);
