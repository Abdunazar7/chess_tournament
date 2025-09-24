import { Router } from "express";
import {
  addChessType,
  getChessTypes,
  getOneChessType,
  updateChessType,
  deleteChessType,
} from "../controllers/chess_type.controller.js";

const router = Router();

router.post("/", addChessType);
router.get("/", getChessTypes);
router.get("/:id", getOneChessType);
router.put("/:id", updateChessType);
router.delete("/:id", deleteChessType);

export default router;
