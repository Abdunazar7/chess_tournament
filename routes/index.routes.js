import { Router } from "express";

import adminRouter from "./admin.routes.js";
import authRouter from "./auth.routes.js";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "Chess API is running ✅" });
});

router.use("/admins", adminRouter);
router.use("/auth", authRouter);

export default router;
