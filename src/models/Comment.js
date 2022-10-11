import mongoose, { mongo } from "mongoose";

const commentSchema = mongoose.Schema({
  content: { type: String, required: true, maxLength: 25 },
  createdAt: {
    type: String,
    required: true,
    default: Date.now,
  },
  video: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Video" },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const Comment = mongoose.model("Comment", commentSchema);
export default Comment;
