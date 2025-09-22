import { Router } from "express";
import { adminLogin, adminLogout, refreshToken } from "../controllers/auth.controller.js";

const router = Router();

// login
router.post("/login", adminLogin);

// logout
router.post("/logout", adminLogout);

// refresh token
router.get("/refresh", refreshToken);

export default router;
