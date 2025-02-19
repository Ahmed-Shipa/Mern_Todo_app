import mongoose, { model, Schema } from "mongoose";
import bcrypt from "bcrypt";

const schema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

export const User = model("User", schema);
