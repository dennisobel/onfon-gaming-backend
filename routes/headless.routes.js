import { Router } from "express";
const router = Router();
import { headless } from "../controllers/headless.controller.js";

router.get("/", headless)
export default router;