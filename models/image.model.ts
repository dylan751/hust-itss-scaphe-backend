import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema(
  {
    shopId: {
      type: String,
      required: [true, 'An image must belongs to a coffee shop'],
    },
    image: {
      type: String,
      required: [true, 'An image must have an url'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

const image = mongoose.model('Image', imageSchema);

export default image;
