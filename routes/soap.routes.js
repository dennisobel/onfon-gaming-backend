import { Router } from "express";
const router = Router();

import { SE } from "../controllers/soapEnvelope.controller.js";

router.post("/", SE)
export default router;