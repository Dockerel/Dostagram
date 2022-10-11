import express from "express";
import {
  getVideoUpload,
  postVideoUpload,
  watch,
} from "../controllers/videoController.js";
import { loggedInUserOnly, videoUpload } from "../middleware.js";

const videoRouter = express.Router();

videoRouter
  .route("/upload")
  .all(loggedInUserOnly)
  .get(getVideoUpload)
  .post(videoUpload.single("video"), postVideoUpload);
videoRouter.get("/watch/:id([0-9a-f]{24})", watch);

export default videoRouter;
