import { Request, Response } from "express";
import { Enrollment } from "../models/Enrollment";

export const getEnrollments = async (req: Request, res: Response) => {
  try {
    const enrollments = await Enrollment.findAll();
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener matrículas", error });
  }
};

export const getEnrollmentById = async (req: Request, res: Response) => {
  try {
    const enrollment = await Enrollment.findByPk(Number(req.params.id));
    if (!enrollment) {
      res.status(404).json({ message: "Matrícula no encontrada" });
      return;
    }
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar matrícula", error });
  }
};

export const createEnrollment = async (req: Request, res: Response) => {
  try {
    const enrollment = await Enrollment.create(req.body);
    res.status(201).json(enrollment);
  } catch (error) {
    res.status(500).json({ message: "Error al crear matrícula", error });
  }
};

export const updateEnrollment = async (req: Request, res: Response) => {
  try {
    const enrollment = await Enrollment.findByPk(Number(req.params.id));
    if (!enrollment) {
      res.status(404).json({ message: "Matrícula no encontrada" });
      return;
    }
    await enrollment.update(req.body);
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar matrícula", error });
  }
};

export const deleteEnrollment = async (req: Request, res: Response) => {
  try {
    const enrollment = await Enrollment.findByPk(Number(req.params.id));
    if (!enrollment) {
      res.status(404).json({ message: "Matrícula no encontrada" });
      return;
    }
    await enrollment.update({ status: "cancelled" });
    res.json({ message: "Matrícula cancelada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar matrícula", error });
  }
};