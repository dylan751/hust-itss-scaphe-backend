import mongoose, { Types } from 'mongoose';

const voteSchema = new mongoose.Schema(
  {
    userId: {
      type: Types.ObjectId,
      required: [true, 'A vote must belongs to a user'],
    },
    categoryId: {
      type: Types.ObjectId,
      required: [true, 'A vote must vote for a category'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

const vote = mongoose.model('Vote', voteSchema);

export default vote;
