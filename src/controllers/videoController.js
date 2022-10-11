import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const getVideoUpload = (req, res) => {
  return res.render("video-upload", { pageTitle: "Video Upload" });
};

export const postVideoUpload = async (req, res) => {
  const { _id } = req.session.loggedInUser;
  const { path } = req.file;
  const { title, content } = req.body;
  const video = await Video.create({
    title,
    content,
    videoUrl: path,
    owner: _id,
  });
  return res.redirect("/");
};

export const watch = async (req, res) => {
  const { id } = req.params;
  const video = await Video.findOne({ _id: id }).populate("owner");
  const comments = await Comment.find({ video: id })
    .sort({ createdAt: "desc" })
    .populate("owner");
  return res.render("watch", { pageTitle: "Watch", video, comments });
};

export const createComment = async (req, res) => {
  const { content } = req.body;
  const { _id } = req.session.loggedInUser;
  const { id } = req.params;
  const commentObject = await Comment.create({
    content: content,
    createdAt: new Date().toLocaleString(),
    video: id,
    owner: _id,
  });
  return res.sendStatus(201);
};

export const deleteComment = async (req, res) => {
  const { id } = req.params;
  const { targetComment } = req.body;
  const targetOwner = await Comment.findOne({ _id: targetComment }).populate(
    "owner"
  ); //comment의 owner를 찾기 위함
  console.log("pass");
  console.log(targetOwner.owner._id);
  console.log(req.session.loggedInUser._id);
  if (String(targetOwner.owner._id) === req.session.loggedInUser._id) {
    console.log("true");
    await Comment.findOneAndDelete({ _id: targetComment });
    return res.sendStatus(201);
  }
};
