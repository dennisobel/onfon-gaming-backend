import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({  
  tagline: String,
  title: String,
  homepage: String,
  overview: String,
  backdrop_path: String,
  poster_path: String,
  // adult: String,
  // director: String,
  // genre: String,
  // popularity: Number,  
  // release_date: String,
  // runtime: String,
  // status: String,
  // video: String,
  // vote_average: Number,
  // vote_count: Number,
  // writer: String
});

const Game = mongoose.model('Game', gameSchema);

export default Game
