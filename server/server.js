const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Suppress MongoDB deprecation warnings
mongoose.set('strictQuery', false);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Backend Server is running on port ' + (process.env.PORT || 5000));
})
.catch(err => {
  console.error('Error:', err.message);
});

// Routes
const activitiesRouter = require('./routes/activities');
app.use('/api/activities', activitiesRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {});
