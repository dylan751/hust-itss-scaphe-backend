import mongoose from 'mongoose';

const shopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A shop must have a name'], // built-in validators
      trim: true,
      maxlength: [40, 'A shop name must have less or equal 40 than characters'],
      minlength: [5, 'A shop name must have more or equal 5 than characters'],
    },
    phone: {
      type: String,
      required: [true, 'A shop must have a phone number'],
    },
    city: {
      type: String,
      required: [true, 'A shop must have a city'],
    },
    district: {
      type: String,
      required: [true, 'A shop must have a district'],
    },
    email: {
      type: String,
      required: [true, 'Please provide your email !'],
      unique: true,
      // validate: [isEmail, 'Please provide a valid email !'],
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Please provide a password !'],
      minlength: 4,
      select: false,
    },
    avatar: {
      type: String,
      required: [true, 'A shop must have a avatar'],
    },
    traffic: {
      type: Number,
      enum: {
        values: [0, 1, 2, 3, 4, 5],
        message:
          'Traffic is either: 0(few), 1(moderate), 2(a bit crowded), 3(crowded), 4(out of seats), 5(closed)',
      },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

const shop = mongoose.model('Shop', shopSchema);

export default shop;
