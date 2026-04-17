const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Activity name is required'],
    trim: true
  },
  category: {
    type: String,
    enum: ['Academic', 'Technical', 'Cultural', 'Sports'],
    required: [true, 'Category is required']
  },
  date: {
    type: Date,
    required: [true, 'Date is required']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Activity', activitySchema);
