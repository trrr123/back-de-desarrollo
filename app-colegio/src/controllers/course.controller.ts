import { Request, Response } from "express";
import { Course } from "../models/Course";

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener cursos", error });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await Course.findByPk(Number(req.params.id));
    if (!course) {
      res.status(404).json({ message: "Curso no encontrado" });
      return;
    }
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar curso", error });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error al crear curso", error });
  }
};

export const updateCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findByPk(Number(req.params.id));
    if (!course) {
      res.status(404).json({ message: "Curso no encontrado" });
      return;
    }
    await course.update(req.body);
    res.json(course);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar curso", error });
  }
};

export const deleteCourse = async (req: Request, res: Response) => {
  try {
    const course = await Course.findByPk(Number(req.params.id));
    if (!course) {
      res.status(404).json({ message: "Curso no encontrado" });
      return;
    }
    await course.update({ status: "inactive" });
    res.json({ message: "Curso desactivado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar curso", error });
  }
};