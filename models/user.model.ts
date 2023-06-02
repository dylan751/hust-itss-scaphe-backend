import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
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
    name: {
      type: String,
      required: [true, 'An user must have a name'], // built-in validators
      trim: true,
      maxlength: [
        40,
        'an user name must have less or equal 40 than characters',
      ],
    },
    country: {
      type: String,
      required: [true, 'An user must have a nation'],
    },
    avatar: {
      type: String,
      required: [true, 'An user must have a avatar'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

const user = mongoose.model('User', userSchema);

export default user;
