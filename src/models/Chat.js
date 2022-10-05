import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  content: { type: String, required: true, maxLength: 25 },
  createdAt: {
    type: String,
    required: true,
    default: Date.now,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

const Chat = mongoose.model("Chat", chatSchema);

export default Chat;
