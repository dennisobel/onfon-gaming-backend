import Game from "../mongodb/models/game.js";
import * as dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import * as fs from "fs";
import * as path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({
  storage: storage,
  fields: ["poster_path", "backdrop_path"],
});

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createGame = async (req, res) => {
  try {
    upload.fields([{ name: "poster_path" }, { name: "backdrop_path" }])(
      req,
      res,
      async (err) => {
        if (err) {
          res.status(500).json({ msg: err.message });
        } else {
          const { backdrop_path, homepage, poster_path, title, tagline, overview } = req.body;

          const photoUrls = await Promise.all([
            cloudinary.uploader.upload(req.files.backdrop_path[0].path),
            cloudinary.uploader.upload(req.files.poster_path[0].path),
          ]);

          const newGame = new Game({
            backdrop_path: photoUrls[0].url,
            homepage,
            poster_path: photoUrls[1].url,
            title,
          });

          await newGame.save();

          res
            .status(200)
            .json({ message: "Game created successfully", data: newGame });
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for retrieving all games
const getAllGames = async (req, res) => {
  try {
    const games = await Game.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for retrieving a specific game by ID
const getGameById = async (req, res) => {
  try {
    const gameId = req.params.id;
    const game = await Game.findById(gameId);

    if (game) {
      res.status(200).json(game);
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for updating a game
const updateGame = async (req, res) => {
  console.log("INSIDE UPDATE");
  console.log(req.params);
  console.log(req.body);
  /*
  try {
    const gameId = req.params.id;
    const gameData = req.body;

    const updatedGame = await Game.findByIdAndUpdate(gameId, gameData, {
      new: true,
    });

    if (updatedGame) {
      res.status(200).json(updatedGame);
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
  */
  try {
    upload.fields([{ name: "poster_path" }, { name: "backdrop_path" }])(
      req,
      res,
      async (err) => {
        if (err) {
          res.status(500).json({ msg: err.message });
        } else {
          const gameId = req.params.id;
          const gameData = req.body;

          // const photoUrls = await Promise.all([
          //   cloudinary.uploader.upload(req?.files?.backdrop_path[0]?.path),
          //   cloudinary.uploader.upload(req?.files?.poster_path[0]?.path),
          // ]);

          // Check if the backdrop_path and poster_path files exist in req.files
          let backdropUrl, posterUrl;
          if (req?.files?.backdrop_path && req?.files?.backdrop_path[0]?.path) {
            backdropUrl = await cloudinary.uploader.upload(
              req.files.backdrop_path[0].path
            );
          }
          if (req?.files?.poster_path && req?.files?.poster_path[0]?.path) {
            posterUrl = await cloudinary.uploader.upload(
              req.files.poster_path[0].path
            );
          }

          // If the images were not selected, use the existing URLs from the request body
          const updatedGameFields = {
            ...gameData,
            backdrop_path: backdropUrl?.url || gameData.backdrop_path,
            poster_path: posterUrl?.url || gameData.poster_path,
          };


          const updatedGame = await Game.findByIdAndUpdate(gameId, updatedGameFields, {
            new: true,
          });

          if (updatedGame) {
            res.status(200).json(updatedGame);
          } else {
            res.status(404).json({ message: "Game not found" });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for deleting a game
const deleteGame = async (req, res) => {
  try {
    const gameId = req.params.id;

    const deletedGame = await Game.findByIdAndDelete(gameId);

    if (deletedGame) {
      res.status(200).json({ message: "Game deleted successfully" });
    } else {
      res.status(404).json({ message: "Game not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Controller for fetching a specific game's HTML, CSS, and JS files
// const fetchGame = (req, res) => {
//   try {
//     const gameId = req.params.id;
//     const currentDir = new URL('.', import.meta.url).pathname;
//     const gamesDir = path.join(currentDir, "../games");
//     const gameFolderPath = path.join(gamesDir, gameId);
//     const indexPath = path.join(gameFolderPath, "index.html");
//     console.log("PATH:",indexPath)
//     fs.readFile(indexPath, "utf8", (err, data) => {
//       if (err) {
//         res.status(404).json({ message: "Game not found", error:err });
//       } else {
//         res.setHeader("Content-Type", "text/html");
//         res.end(data);
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export { createGame, getAllGames, getGameById, updateGame, deleteGame };
