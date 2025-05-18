import { Schema, model, Document, Types } from 'mongoose';

export interface IActivity extends Document {
  userId: Types.ObjectId;
  type: string;
  data: object;
  createdAt: Date;
}

const activitiesSchema = new Schema<IActivity>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  data: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
});

export default model<IActivity>('Activities', activitiesSchema);
