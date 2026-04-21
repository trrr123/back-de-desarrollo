import { Router } from "express";
import {
  getTuitionPayments,
  getTuitionPaymentById,
  createTuitionPayment,
  updateTuitionPayment,
  deleteTuitionPayment,
} from "../controllers/tuitionPayment.controller";

const router = Router();

router.get("/", getTuitionPayments);
router.get("/:id", getTuitionPaymentById);
router.post("/", createTuitionPayment);
router.put("/:id", updateTuitionPayment);
router.delete("/:id", deleteTuitionPayment);

export default router;