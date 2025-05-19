// auth.middleware.ts
import { Request, Response, RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken: RequestHandler = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    res.status(401).json({ message: 'Sin token' });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token inválido' });
    return;
  }
};
