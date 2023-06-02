import mongoose from 'mongoose';

const voteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: [true, 'A vote must belongs to a user'],
    },
    categoryId: {
      type: String,
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
