const router = require('express').Router();
const User = require('../models/User');

// Submit Score
router.post('/score', async (req, res) => {
    try {
        const { userId, scoreIncrement } = req.body;

        // In a real app, verify token here to ensure userId matches authenticated user
        // For now we trust the client or assume middleware usage later

        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: 'User not found' });

        user.totalScore += scoreIncrement;
        await user.save();

        res.json({ newScore: user.totalScore });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get Leaderboard
router.get('/leaderboard', async (req, res) => {
    try {
        // Top 10 users by score
        const leaderboard = await User.find()
            .sort({ totalScore: -1 })
            .limit(10)
            .select('username totalScore');

        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
