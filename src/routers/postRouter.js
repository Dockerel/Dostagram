import express from "express";
import {
  deletePost,
  getPostEdit,
  getWritePost,
  postPostEdit,
  postWritePost,
} from "../controllers/postController.js";
import { loggedInUserOnly, postImageUpload } from "../middleware.js";

const postRouter = express.Router();

postRouter
  .route("/write")
  .all(loggedInUserOnly)
  .get(getWritePost)
  .post(postImageUpload.array("postImages", 4), postWritePost);
postRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(loggedInUserOnly)
  .get(getPostEdit)
  .post(postPostEdit);
postRouter
  .route("/:id([0-9a-f]{24})/delete")
  .all(loggedInUserOnly)
  .get(deletePost);

export default postRouter;
