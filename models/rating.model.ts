import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'A rating must belongs to a user'],
    },
    shopId: {
      type: String,
      required: [true, 'A rating must belongs to a coffee shop'],
    },
    star: {
      type: Number,
      enum: {
        values: [1, 2, 3, 4, 5],
        message: 'Rating is either: 1, 2, 3, 4, 5 stars',
      },
    },
    content: {
      type: String,
      required: [false, 'The content of the review'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

const rating = mongoose.model('Rating', ratingSchema);

export default rating;
