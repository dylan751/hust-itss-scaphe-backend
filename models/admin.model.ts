import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema(
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    timestamps: true,
  },
);

const admin = mongoose.model('Admin', adminSchema);

export default admin;
