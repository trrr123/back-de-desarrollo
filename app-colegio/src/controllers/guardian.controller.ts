import { Request, Response } from "express";
import { Guardian } from "../models/Guardian";

// Obtener todos
export const getGuardians = async (req: Request, res: Response) => {
  try {
    const guardians = await Guardian.findAll();
    res.json(guardians);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener acudientes", error });
  }
};

// Obtener por ID
export const getGuardianById = async (req: Request, res: Response) => {
  try {
    const guardian = await Guardian.findByPk(Number(req.params.id));
    if (!guardian) {
      res.status(404).json({ message: "Acudiente no encontrado" });
      return;
    }
    res.json(guardian);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar acudiente", error });
  }
};

// Crear
export const createGuardian = async (req: Request, res: Response) => {
  try {
    const guardian = await Guardian.create(req.body);
    res.status(201).json(guardian);
  } catch (error) {
    res.status(500).json({ message: "Error al crear acudiente", error });
  }
};

// Actualizar
export const updateGuardian = async (req: Request, res: Response) => {
  try {
    const guardian = await Guardian.findByPk(Number(req.params.id));
    if (!guardian) {
      res.status(404).json({ message: "Acudiente no encontrado" });
      return;
    }
    await guardian.update(req.body);
    res.json(guardian);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar acudiente", error });
  }
};

// Eliminar (soft delete → status inactive)
export const deleteGuardian = async (req: Request, res: Response) => {
  try {
    const guardian = await Guardian.findByPk(Number(req.params.id));
    if (!guardian) {
      res.status(404).json({ message: "Acudiente no encontrado" });
      return;
    }
    await guardian.update({ status: "inactive" });
    res.json({ message: "Acudiente desactivado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar acudiente", error });
  }
};