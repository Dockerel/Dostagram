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
  const video = await Video.findOne({ _id: id });
  console.log(video);
  return res.render("watch", { pageTitle: "Watch", video });
};
