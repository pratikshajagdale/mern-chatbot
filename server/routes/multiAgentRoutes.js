import express from "express";

import {
  multiAgentChat,
} from "../controllers/multiAgentController.js";

const router = express.Router();

router.get(
  "/conversation",
  multiAgentChat
);

export default router;