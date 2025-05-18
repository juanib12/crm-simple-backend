import { Request, Response } from 'express';

export const login = (req: Request, res: Response) => {
  const { email, password } = req.body;
  // TODO: lógica de login
  res.status(200).json({ message: `Login de ${email}` });
};

export const register = (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  // TODO: lógica de registro
  res.status(201).json({ message: `Registro de ${email}` });
};