import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is neccessary for creating an account"],
      unique: [true, "Email is already present"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Invalid Email address",
      ],
      lowercase: true,
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Name is required to create an account"],
    },
    password: {
      type: String,
      required: [true, "Password is required to create an account"],
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
    resetPasswordToken: {
      type: String,
    },
    resetPasswordTokenExpiary: {
      type: Date,
    },
    verificationToken: {
      type: String,
    },
    verificationTokenExpiary: {
      type: Date,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("user", userSchema);
export default userModel;
