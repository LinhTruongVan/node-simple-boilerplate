import mongoose from "mongoose";

export enum UserRole {
  User = "USER",
  SuperAdmin = "SUPER_ADMIN"
}

export type AuthData = {
  _id: string;
  username: string;
  role: string;
  token: string;
};

export type TokenPayload = {
  _id: string;
  username: string;
  role: string;
  jti: string;
};

export type UserModel = mongoose.Document & {
  username: string;
  password: string;
  role: string;
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
    password: String,
    role: {
      type: String,
      required: true,
      default: UserRole.User
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<UserModel>("User", schema);
