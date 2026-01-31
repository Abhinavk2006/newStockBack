const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
const contentRoutes = require('./routes/content');
const gameRoutes = require('./routes/game');

app.use('/api/auth', authRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/game', gameRoutes);

// Basic Route
app.get('/', (req, res) => {
    res.send('Stock Market Learning Platform API is running');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB Connection Error:', err));


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
