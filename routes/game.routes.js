import express from "express";
import {
  createGame,
  getAllGames,
  getGameById,
  // fetchGame,
  updateGame,
  deleteGame,
} from "../controllers/game.controller.js";

const router = express.Router();

// Create a new game
router.post("/add-game", createGame);

// Get all games
router.get("/", getAllGames);

// Get a specific game by ID
router.get("/:id", getGameById);
// router.get("/:id", fetchGame);

// Update a game
router.put("/:id", updateGame);

// Delete a game
router.delete("/:id", deleteGame);

export default router;
