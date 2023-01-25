import express from "express";
import {
  getVideoUpload,
  postVideoUpload,
  watch,
  deleteVideo,
} from "../controllers/videoController.js";
import { loggedInUserOnly, videoUpload } from "../middleware.js";

const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .all(loggedInUserOnly)
  .get(getVideoUpload)
  .post(videoUpload.fields([{ name: "video", maxCount: 1 }]), postVideoUpload);
// .post(videoUpload.single("video"), postVideoUpload);
videoRouter.get("/watch/:id([0-9a-f]{24})", watch);
videoRouter.get("/:id([0-9a-f]{24})/delete", deleteVideo);

export default videoRouter;
