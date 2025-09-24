import { Router } from "express";

import adminRouter from "./admin.routes.js";
import authRouter from "./auth.routes.js";
import playerRouter from "./player.routes.js";
import tournamentRouter from "./tournament.routes.js";
import tournamentPlayerRouter from "./tournament_player.routes.js";
import roundRouter from "./round.routes.js";
import matchRouter from "./match.routes.js";
import chessTypeRouter from "./chess_type.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "♟️ Chess Tournament API is running ✅" });
});

router.use("/auth", authRouter);
router.use("/admins", adminRouter);
router.use("/players", playerRouter);
router.use("/tournaments", tournamentRouter);
router.use("/tournament-players", tournamentPlayerRouter);
router.use("/rounds", roundRouter);
router.use("/matches", matchRouter);
router.use("/chess-types", chessTypeRouter);

export default router;
