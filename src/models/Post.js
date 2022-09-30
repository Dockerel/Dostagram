import mongoose from "mongoose";

const postSchema = mongoose.Schema({
  imagesUrl: [{ type: String, required: true }],
  content: { type: String, required: true },
  hashtags: [{ type: String, required: true }],
  createdAt: {
    type: String,
    required: true,
    default: Date.now,
  },
  owner: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
});

postSchema.static("formatImagesUrl", function (imagesUrl) {
  return imagesUrl.map((object) =>
    object.path ? `/${object.path}` : "/etc/error.png"
  );
});

postSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) => (word.startsWith("#") ? word : `#${word}`));
});

const Post = mongoose.model("Post", postSchema);

export default Post;
