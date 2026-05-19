import mongoose, { Document, Schema } from 'mongoose';

export interface IFraudDetectionLog extends Document {
  transactionId: number;
  riskScore: number;
  timestamp: Date;
}

const FraudDetectionLogSchema: Schema = new Schema({
  transactionId: { type: Number, required: true },
  riskScore: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.model<IFraudDetectionLog>('FraudDetectionLog', FraudDetectionLogSchema);
