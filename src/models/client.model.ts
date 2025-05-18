import { Schema, model, Document, Types } from 'mongoose';

export interface IClient extends Document {
  userId: Types.ObjectId;
  name: string;
  phone?: string;
  email?: string;
  city?: string;
  contactChannel?: string;
  userName?: string;
  createdAt: Date;
}

const clientSchema = new Schema<IClient>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  phone: String,
  email: String,
  city: String,
  contactChannel: { type: String, enum: ['email', 'phone', 'whatsapp', 'facebook', 'instagram'] },
  createdAt: { type: Date, default: Date.now }
});

export default model<IClient>('Client', clientSchema);
