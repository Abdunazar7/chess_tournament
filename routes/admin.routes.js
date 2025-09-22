import { Router } from "express";
import {
  addAdmin,
  getAdmins,
  getOneAdmin,
  updateAdmin,
  deleteAdmin,
} from "../controllers/admin.controller.js";

import authGuard from "../middlewares/guards/auth.guard.js";
import iscreatorGuard from "../middlewares/guards/iscreator.guard.js";
import selfGuard from "../middlewares/guards/self.guard.js";

import { validateJoi } from "../middlewares/validators/joi.validator.js";
import {
  createAdminSchema,
  updateAdminSchema,
} from "../validators/admin.validator.js";

const router = Router();

router.post("/", authGuard, iscreatorGuard, validateJoi(createAdminSchema), addAdmin);
router.get("/", authGuard, iscreatorGuard, getAdmins);
router.get("/:id", authGuard, selfGuard, getOneAdmin);
router.put("/:id", authGuard, selfGuard, validateJoi(updateAdminSchema), updateAdmin);
router.delete("/:id", authGuard, iscreatorGuard, deleteAdmin);

export default router;
