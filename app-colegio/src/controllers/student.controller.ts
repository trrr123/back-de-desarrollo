import { Request, Response } from "express";
import { Student } from "../models/Student";

// Crear estudiante
export const createStudent = async (req: Request, res: Response) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error al crear estudiante", error });
  }
};

// Obtener todos
export const getStudents = async (req: Request, res: Response) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener estudiantes", error });
  }
};

export const getStudentById = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const student = await Student.findByPk(id);
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar estudiante", error });
  }
};

// Actualizar
export const updateStudent = async (req: Request, res: Response) => {
  try {
    await Student.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({ message: "Estudiante actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar", error });
  }
};

// Eliminar
export const deleteStudent = async (req: Request, res: Response) => {
  try {
    await Student.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: "Estudiante eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar", error });
  }
};