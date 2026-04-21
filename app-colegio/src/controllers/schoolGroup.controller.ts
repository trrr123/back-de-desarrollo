import { Request, Response } from "express";
import { SchoolGroup } from "../models/SchoolGroup";

export const getSchoolGroups = async (req: Request, res: Response) => {
  try {
    const groups = await SchoolGroup.findAll();
    res.json(groups);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener grupos", error });
  }
};

export const getSchoolGroupById = async (req: Request, res: Response) => {
  try {
    const group = await SchoolGroup.findByPk(Number(req.params.id));
    if (!group) {
      res.status(404).json({ message: "Grupo no encontrado" });
      return;
    }
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar grupo", error });
  }
};

export const createSchoolGroup = async (req: Request, res: Response) => {
  try {
    const group = await SchoolGroup.create(req.body);
    res.status(201).json(group);
  } catch (error) {
    res.status(500).json({ message: "Error al crear grupo", error });
  }
};

export const updateSchoolGroup = async (req: Request, res: Response) => {
  try {
    const group = await SchoolGroup.findByPk(Number(req.params.id));
    if (!group) {
      res.status(404).json({ message: "Grupo no encontrado" });
      return;
    }
    await group.update(req.body);
    res.json(group);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar grupo", error });
  }
};

export const deleteSchoolGroup = async (req: Request, res: Response) => {
  try {
    const group = await SchoolGroup.findByPk(Number(req.params.id));
    if (!group) {
      res.status(404).json({ message: "Grupo no encontrado" });
      return;
    }
    await group.update({ status: "inactive" });
    res.json({ message: "Grupo desactivado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar grupo", error });
  }
};