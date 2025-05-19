import { Request, Response } from 'express';
import Order from '../models/order.model';

export const getOrders = async (req: Request, res: Response) => {
  const userId = req.user && typeof req.user !== 'string' ? req.user.id : null;

  try {
    const orders = await Order.find({ userId: userId }).populate('client');
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener los pedidos' });
  }
};

export const createOrder = async (req: Request, res: Response) => {
  const userId = req.user && typeof req.user !== 'string' ? req.user.id : null;

  try {
    const newOrder = new Order({ ...req.body, userId: userId });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el pedido' });
  }
};

export const updateOrder = async (req: Request, res: Response) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el pedido' });
  }
};

export const deleteOrder = async (req: Request, res: Response) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Pedido eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el pedido' });
  }
};
