import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  plan: 'free' | 'premium' | 'pro';
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  plan: { type: String, enum: ['free', 'premium', 'pro'], default: 'free' },
  createdAt: { type: Date, default: Date.now }
});

export default model<IUser>('User', userSchema);
