import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 120,
    },
    email: {
      type: String,
      required: true,
      max: 120,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    msisdn: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
