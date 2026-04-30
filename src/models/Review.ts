import mongoose, { Schema, Document } from 'mongoose';

export interface IReview extends Document {
  productId: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ReviewSchema: Schema = new Schema({
  productId: { type: String, required: true },
  userName: { type: String, required: true },
  userEmail: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  verified: { type: Boolean, default: false },
}, {
  timestamps: true,
});

export default mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema);
