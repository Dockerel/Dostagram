import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  imagesUrl: [{ type: String, required: true }],
  title: { type: String, required: true, maxLength: 25 },
  content: { type: String, required: true, maxLength: 80 },
  hashtags: [{ type: String, required: true }],
  createdAt: {
    type: String,
    required: true,
    default: Date.now,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

postSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Post = mongoose.model("Post", postSchema);

export default Post;
