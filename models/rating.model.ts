import mongoose, { Types } from 'mongoose';

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: [true, 'A rating must belongs to a user'],
    },
    shopId: {
      type: Types.ObjectId,
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
    categoryIds: {
      type: [Types.ObjectId],
      required: [false, 'The array of category ids voted true by user'],
      default: [],
    },
    isTrafficOk: {
      type: Boolean,
      required: [
        false,
        'The vote for if the shop traffic is currently correct or not',
      ],
      default: false,
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
