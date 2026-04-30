import mongoose, { Schema, Document } from 'mongoose';

export interface ICoupon extends Document {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minPurchase?: number;
  maxUses?: number;
  usedCount: number;
  expiresAt: Date;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const CouponSchema: Schema = new Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  discountValue: { type: Number, required: true },
  minPurchase: { type: Number },
  maxUses: { type: Number },
  usedCount: { type: Number, default: 0 },
  expiresAt: { type: Date, required: true },
  active: { type: Boolean, default: true },
}, {
  timestamps: true,
});

export default mongoose.models.Coupon || mongoose.model<ICoupon>('Coupon', CouponSchema);
