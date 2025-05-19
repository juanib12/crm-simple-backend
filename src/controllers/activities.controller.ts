import { Request, Response } from 'express';
import Activity from '../models/activities.model';

export const getActivities = async (req: Request, res: Response) => {
  const userId = req.user && typeof req.user !== 'string' ? req.user.id : null;

  try {
    const activities = await Activity.find({ userId: userId });
    res.status(200).json(activities);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener las actividades' });
  }
};

export const createActivity = async (req: Request, res: Response) => {
  const userId = req.user && typeof req.user !== 'string' ? req.user.id : null;

  try {
    const newActivity = new Activity({ ...req.body, userId: userId });
    await newActivity.save();
    res.status(201).json(newActivity);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la actividad' });
  }
};

export const updateActivity = async (req: Request, res: Response) => {
  try {
    const updated = await Activity.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar la actividad' });
  }
};

export const deleteActivity = async (req: Request, res: Response) => {
  try {
    await Activity.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Actividad eliminada' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar la actividad' });
  }
};
