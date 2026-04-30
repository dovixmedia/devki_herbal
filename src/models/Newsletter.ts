import mongoose, { Schema, Document } from 'mongoose';

export interface INewsletter extends Document {
  email: string;
  subscribed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const NewsletterSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  subscribed: { type: Boolean, default: true },
}, {
  timestamps: true,
});

export default mongoose.models.Newsletter || mongoose.model<INewsletter>('Newsletter', NewsletterSchema);
