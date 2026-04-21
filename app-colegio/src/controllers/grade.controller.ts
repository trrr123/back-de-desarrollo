import { Request, Response } from "express";
import { Grade } from "../models/Grade";

export const getGrades = async (req: Request, res: Response) => {
  try {
    const grades = await Grade.findAll();
    res.json(grades);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener calificaciones", error });
  }
};

export const getGradeById = async (req: Request, res: Response) => {
  try {
    const grade = await Grade.findByPk(Number(req.params.id));
    if (!grade) {
      res.status(404).json({ message: "Calificación no encontrada" });
      return;
    }
    res.json(grade);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar calificación", error });
  }
};

export const createGrade = async (req: Request, res: Response) => {
  try {
    const grade = await Grade.create(req.body);
    res.status(201).json(grade);
  } catch (error) {
    res.status(500).json({ message: "Error al crear calificación", error });
  }
};

export const updateGrade = async (req: Request, res: Response) => {
  try {
    const grade = await Grade.findByPk(Number(req.params.id));
    if (!grade) {
      res.status(404).json({ message: "Calificación no encontrada" });
      return;
    }
    await grade.update(req.body);
    res.json(grade);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar calificación", error });
  }
};

export const deleteGrade = async (req: Request, res: Response) => {
  try {
    const grade = await Grade.findByPk(Number(req.params.id));
    if (!grade) {
      res.status(404).json({ message: "Calificación no encontrada" });
      return;
    }
    await grade.update({ status: "draft" });
    res.json({ message: "Calificación desactivada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar calificación", error });
  }
};