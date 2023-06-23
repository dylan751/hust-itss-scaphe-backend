import mongoose, { Types } from 'mongoose';

const photoSchema = new mongoose.Schema(
  {
    shopId: {
      type: Types.ObjectId,
      required: [true, 'An photo must belongs to a coffee shop'],
    },
    photoUrl: {
      type: String,
      required: [true, 'An photo must have an url'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

const photo = mongoose.model('Photo', photoSchema);

export default photo;
