import { Router } from "express";
import {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} from "../controllers/student.controller";

const router = Router();

// Obtener todos
router.get("/", getStudents);

// Obtener por ID
router.get("/:id", getStudentById);

// Crear
router.post("/", createStudent);

// Actualizar
router.put("/:id", updateStudent);

// Eliminar
router.delete("/:id", deleteStudent);

export default router;