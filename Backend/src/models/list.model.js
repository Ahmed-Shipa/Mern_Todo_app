import mongoose, { model, Schema } from "mongoose";

const schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  {
    versionKey: false,
  }
);

export const List = model("List", schema);
