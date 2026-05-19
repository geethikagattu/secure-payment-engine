import mongoose, { Document, Schema } from 'mongoose';

export interface IActivityLog extends Document {
  userId: number;
  action: string;
  timestamp: Date;
}

const ActivityLogSchema: Schema = new Schema({
  userId: { type: Number, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IActivityLog>('ActivityLog', ActivityLogSchema);
