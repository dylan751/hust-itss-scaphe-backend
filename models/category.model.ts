import mongoose, { Types } from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    shopId: {
      type: Types.ObjectId,
      required: [true, 'A category must belongs to a coffee shop'],
    },
    category: {
      type: String,
      required: [true, 'The name of the category'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

const category = mongoose.model('Category', categorySchema);

export default category;
