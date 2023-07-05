import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  adult: Boolean,
  backdrop_path: String,
  director: String,
  genre: String,
  homepage: String,
  overview: String,
  popularity: Number,
  poster_path: String,
  release_date: String,
  runtime: Number,
  status: String,
  tagline: String,
  title: String,
  video: String,
  vote_average: Number,
  vote_count: Number,
  writer: String
});

const Game = mongoose.model('Game', gameSchema);

export default Game
