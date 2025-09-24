import { Router } from "express";
import {
  addTournament,
  getTournaments,
  getOneTournament,
  updateTournament,
  deleteTournament,
} from "../controllers/tournament.controller.js";

const router = Router();

router.post("/", addTournament);
router.get("/", getTournaments);
router.get("/:id", getOneTournament);
router.put("/:id", updateTournament);
router.delete("/:id", deleteTournament);

export default router;
