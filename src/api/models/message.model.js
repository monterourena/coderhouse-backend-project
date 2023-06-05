import mongoose from "mongoose";

const collection = "messages";
const schema = new mongoose.Schema(
  {
    user: String,
    message: String,
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const messageModel = mongoose.model(collection, schema);
export { messageModel };
