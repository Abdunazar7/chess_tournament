import { Router } from "express";
import { adminLogin, adminLogout, refreshToken } from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", adminLogin);

router.post("/logout", adminLogout);

router.get("/refresh", refreshToken);

export default router;
