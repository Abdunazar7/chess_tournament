import { Router } from "express";
import {
  addTournamentPlayer,
  getTournamentPlayers,
  getOneTournamentPlayer,
  updateTournamentPlayer,
  deleteTournamentPlayer,
} from "../controllers/tournament_player.controller.js";

const router = Router();

router.post("/", addTournamentPlayer);
router.get("/", getTournamentPlayers);
router.get("/:id", getOneTournamentPlayer);
router.put("/:id", updateTournamentPlayer);
router.delete("/:id", deleteTournamentPlayer);

export default router;
