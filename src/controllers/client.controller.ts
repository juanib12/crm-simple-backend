import { Request, Response } from 'express';
import Client from '../models/client.model';

export const getClients = async (req: Request, res: Response) => {
  const userId = req.user && typeof req.user !== 'string' ? req.user.id : null;

  try {
    const clients = await Client.find({ userId: userId });
    res.status(200).json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los clientes' });
  }
};

export const createClient = async (req: Request, res: Response) => {
  const userId = req.user && typeof req.user !== 'string' ? req.user.id : null;

  try {
    const newClient = new Client({ ...req.body, userId: userId });
    await newClient.save();
    res.status(201).json(newClient);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el cliente' });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const updated = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el cliente' });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    await Client.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Cliente eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el cliente' });
  }
};
