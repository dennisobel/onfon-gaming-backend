import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";

import connectDB from "./mongodb/connect.js";
import userRouter from "./routes/user.routes.js";
import gameRouter from "./routes/game.routes.js";
import headlessRouter from "./routes/headless.routes.js";	
import SE from "./routes/soap.routes.js";

import * as fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Get the current module's URL and convert it to the file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// const projectsPath = join(dirname(__dirname), "games");
// const projectsPath = join(dirname(dirname(__filename)), "games");
const projectsPath = join(process.cwd(), "games");

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors({
//   origin:"*"
// }));

const corsOptions = {
  origin: '*',
  // origin: 'https://epicgames.co.ke',
  // origin: 'http://localhost:5173',
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});

app.use("/users", userRouter);
app.use("/games", gameRouter);
app.use("/game_play",SE)
app.use("/headless", headlessRouter);

// Catch-all route for serving individual projects
// let projectName
// app.get("/games/:projectName", (req, res) => {
//   projectName = req.params.projectName;
//   const projectFolderPath = join(projectsPath, projectName);
//   if (fs.existsSync(projectFolderPath)) {
//     res.sendFile(join(projectFolderPath, "index.html"));
//   } else {
//     res.status(404).json({ message: "Project not found" });
//   }
// }).use("/games/:projectName", express.static(projectsPath + "/" + projectName));

// app.use("/games/:projectName", express.static(projectsPath));
// app.use("/games/:projectName", express.static(projectsPath + "/" + projectName));

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);

    app.listen(8080, () =>
      console.log("Server started on port http://localhost:8080")
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();
