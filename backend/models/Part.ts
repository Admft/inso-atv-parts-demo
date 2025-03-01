import mongoose, { Schema, Document } from 'mongoose';

interface IPart extends Document {
  name: string;
  description: string;
  price: number;
  inventory: number;
  imageUrl: string;
}

const partSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  inventory: { type: Number, required: true },
  imageUrl: { type: String, required: true },
});

export default mongoose.model<IPart>('Part', partSchema);