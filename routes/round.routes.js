import { Router } from "express";
import {
  addRound,
  getRounds,
  getOneRound,
  updateRound,
  deleteRound,
} from "../controllers/round.controller.js";

const router = Router();

router.post("/", addRound);
router.get("/", getRounds);
router.get("/:id", getOneRound);
router.put("/:id", updateRound);
router.delete("/:id", deleteRound);

export default router;
