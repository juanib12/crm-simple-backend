import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

import { connectDB } from './config/db';
import authRoutes from './routes/auth.route';
import clientRoutes from './routes/client.route';
import orderRoutes from './routes/order.route';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Conexión a MongoDB
connectDB();

// Middlewares globales
app.use(helmet());
app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/orders', orderRoutes);

// Ruta base
app.get('/', (_req, res) => {
  res.send('🚀 CRM API está funcionando');
});

// Manejo de rutas no encontradas
app.use((_req, res) => {
  res.status(404).json({ message: 'Ruta no encontrada' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});
