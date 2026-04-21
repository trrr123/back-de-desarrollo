import { Router } from "express";
import {
  getSchoolGroups,
  getSchoolGroupById,
  createSchoolGroup,
  updateSchoolGroup,
  deleteSchoolGroup,
} from "../controllers/schoolGroup.controller";

const router = Router();

router.get("/", getSchoolGroups);
router.get("/:id", getSchoolGroupById);
router.post("/", createSchoolGroup);
router.put("/:id", updateSchoolGroup);
router.delete("/:id", deleteSchoolGroup);

export default router;