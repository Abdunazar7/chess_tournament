import { Router } from "express";
import {
  addMatch,
  getMatches,
  getOneMatch,
  updateMatch,
  deleteMatch,
} from "../controllers/match.controller.js";

const router = Router();

router.post("/", addMatch);
router.get("/", getMatches);
router.get("/:id", getOneMatch);
router.put("/:id", updateMatch);
router.delete("/:id", deleteMatch);

export default router;
