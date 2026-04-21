import { Request, Response } from "express";
import { Attendance } from "../models/Attendance";

export const getAttendances = async (req: Request, res: Response) => {
  try {
    const attendances = await Attendance.findAll();
    res.json(attendances);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener asistencias", error });
  }
};

export const getAttendanceById = async (req: Request, res: Response) => {
  try {
    const attendance = await Attendance.findByPk(Number(req.params.id));
    if (!attendance) {
      res.status(404).json({ message: "Asistencia no encontrada" });
      return;
    }
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar asistencia", error });
  }
};

export const createAttendance = async (req: Request, res: Response) => {
  try {
    const attendance = await Attendance.create(req.body);
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error al crear asistencia", error });
  }
};

export const updateAttendance = async (req: Request, res: Response) => {
  try {
    const attendance = await Attendance.findByPk(Number(req.params.id));
    if (!attendance) {
      res.status(404).json({ message: "Asistencia no encontrada" });
      return;
    }
    await attendance.update(req.body);
    res.json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar asistencia", error });
  }
};

export const deleteAttendance = async (req: Request, res: Response) => {
  try {
    const attendance = await Attendance.findByPk(Number(req.params.id));
    if (!attendance) {
      res.status(404).json({ message: "Asistencia no encontrada" });
      return;
    }
    await attendance.destroy();
    res.json({ message: "Asistencia eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar asistencia", error });
  }
};