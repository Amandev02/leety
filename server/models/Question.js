const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: String,
  companies: [String],
  solved: { type: Boolean, default: false },
});

module.exports = mongoose.model('Question', questionSchema);
