import mongoose from "mongoose";

export type UserModel = mongoose.Document & {
  username: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

const schema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: String
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

export default mongoose.model<UserModel>("User", schema);
