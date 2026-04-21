import { Request, Response } from "express";
import { TuitionPayment } from "../models/TuitionPayment";

export const getTuitionPayments = async (req: Request, res: Response) => {
  try {
    const payments = await TuitionPayment.findAll();
    res.json(payments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener pagos", error });
  }
};

export const getTuitionPaymentById = async (req: Request, res: Response) => {
  try {
    const payment = await TuitionPayment.findByPk(Number(req.params.id));
    if (!payment) {
      res.status(404).json({ message: "Pago no encontrado" });
      return;
    }
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error al buscar pago", error });
  }
};

export const createTuitionPayment = async (req: Request, res: Response) => {
  try {
    const payment = await TuitionPayment.create(req.body);
    res.status(201).json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error al crear pago", error });
  }
};

export const updateTuitionPayment = async (req: Request, res: Response) => {
  try {
    const payment = await TuitionPayment.findByPk(Number(req.params.id));
    if (!payment) {
      res.status(404).json({ message: "Pago no encontrado" });
      return;
    }
    await payment.update(req.body);
    res.json(payment);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar pago", error });
  }
};

export const deleteTuitionPayment = async (req: Request, res: Response) => {
  try {
    const payment = await TuitionPayment.findByPk(Number(req.params.id));
    if (!payment) {
      res.status(404).json({ message: "Pago no encontrado" });
      return;
    }
    await payment.update({ status: "cancelled" });
    res.json({ message: "Pago cancelado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar pago", error });
  }
};
