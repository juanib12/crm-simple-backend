import { Schema, model, Document, Types } from 'mongoose';

export interface IOrder extends Document {
  userId: Types.ObjectId;
  clientId: Types.ObjectId;
  title: string;
  description: string;
  status: 'Pendiente' | 'Pagado' | 'Enviado' | 'Finalizado' | 'Cancelado';
  amount: number;
  paidAt: Date;
  sentAt: Date;
  createdAt: Date;
}

const orderSchema = new Schema<IOrder>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  clientId: { type: Schema.Types.ObjectId, ref: 'Client', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, enum: ['Pendiente', 'Pagado', 'Enviado', 'Finalizado', 'Cancelado'], default: 'Pendiente' },
  amount: { type: Number, required: true },
  paidAt: { type: Date, required: true },
  sentAt: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default model<IOrder>('Order', orderSchema);
