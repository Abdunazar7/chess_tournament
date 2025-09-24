import { Router } from "express";
import {
  addPlayer,
  getPlayers,
  getOnePlayer,
  updatePlayer,
  deletePlayer,
} from "../controllers/player.controller.js";

const router = Router();

router.post("/", addPlayer);
router.get("/", getPlayers);
router.get("/:id", getOnePlayer);
router.put("/:id", updatePlayer);
router.delete("/:id", deletePlayer);

export default router;
