// import mongoose from "mongoose";

// const gameSchema = new mongoose.Schema({  
//   tagline: String,
//   title: String,
//   homepage: String,
//   overview: String,
//   backdrop_path: String,
//   poster_path: String,
// });

// const Game = mongoose.model('Game', gameSchema);

// export default Game


import mongoose from "mongoose";
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: {
    type: String,
    required: false
  },
  category: {
    type: String,
    required: false
  },
  banner: {
    type: String,
    required: false
  },
  overview: {
    type: String,
    required: false
  },
  demo: {
    type: String,
    default: ''
  },
  play: {
    type: String,
    required: false
  },
  tagline: {
    type: String,
    required: false
  },
  homepage: {
    type: String,
    required: false
  },
  backdrop_path: {
    type: String,
    required: false
  },
  poster_path: {
    type: String,
    required: false
  },
});

const Game = mongoose.model('Game', gameSchema);

export default Game





// _id
// 64ca04ee8897abf4a7f740ee
// title
// "Puzzle Game Cartoon"
// homepage
// "9"
// backdrop_path
// "http://res.cloudinary.com/dhew50ten/image/upload/v1690961133/ufjfp4mzl…"
// poster_path
// "http://res.cloudinary.com/dhew50ten/image/upload/v1690961133/avz69zmgl…"
// __v
// 0