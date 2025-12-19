const router = require('express').Router();
const Lesson = require('../models/Lesson');
const Quiz = require('../models/Quiz');

// Get all lessons (filtered by category if needed)
router.get('/lessons', async (req, res) => {
    try {
        const lessons = await Lesson.find().sort({ order: 1 });
        res.json(lessons);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a lesson (Admin only normally, but public for now/seeding)
router.post('/lessons', async (req, res) => {
    try {
        const newLesson = new Lesson(req.body);
        const savedLesson = await newLesson.save();
        res.json(savedLesson);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get random quizzes
router.get('/quizzes/random', async (req, res) => {
    try {
        const count = parseInt(req.query.count) || 5;
        const quizzes = await Quiz.aggregate([{ $sample: { size: count } }]);
        res.json(quizzes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Add a quiz
router.post('/quizzes', async (req, res) => {
    try {
        const newQuiz = new Quiz(req.body);
        const savedQuiz = await newQuiz.save();
        res.json(savedQuiz);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
