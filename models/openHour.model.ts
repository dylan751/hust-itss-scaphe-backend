import mongoose, { Types } from 'mongoose';

const openHourSchema = new mongoose.Schema(
  {
    shopId: {
      type: Types.ObjectId,
      required: [true, 'An open hour must belongs to a coffee shop'],
    },
    day: {
      type: Number,
      enum: {
        values: [2, 3, 4, 5, 6, 7, 8],
        message:
          'Day is either: 2(Mon), 3(Tue), 4(Wed), 5(Thu), 6(Fri), 7(Sat), 8(Sun)',
      },
    },
    openTime: {
      type: Date,
      required: [false, 'The open time of the Coffee shop'],
    },
    closeTime: {
      type: Date,
      required: [false, 'The close time of the Coffee shop'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

const openHour = mongoose.model('OpenHour', openHourSchema);

export default openHour;
