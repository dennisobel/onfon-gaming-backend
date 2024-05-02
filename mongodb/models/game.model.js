const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  banner: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  demo: {
    type: String,
    default: '' // Assuming demo link might be empty
  },
  play: {
    type: String,
    required: true
  }
});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game;
