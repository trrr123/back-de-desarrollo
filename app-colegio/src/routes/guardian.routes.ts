import { Router } from "express";
import {
  getGuardians,
  getGuardianById,
  createGuardian,
  updateGuardian,
  deleteGuardian,
} from "../controllers/guardian.controller";

const router = Router();

router.get("/", getGuardians);
router.get("/:id", getGuardianById);
router.post("/", createGuardian);
router.put("/:id", updateGuardian);
router.delete("/:id", deleteGuardian);

export default router;