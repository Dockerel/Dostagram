import express from "express";
import {
  deletePost,
  getPostEdit,
  getWritePost,
  postPostEdit,
  postWritePost,
} from "../controllers/postController.js";
import { postImageUpload } from "../middleware.js";

const postRouter = express.Router();

postRouter
  .route("/write")
  .get(getWritePost)
  .post(postImageUpload.array("postImages", 4), postWritePost);
postRouter.route("/:id([0-9a-f]{24})/edit").get(getPostEdit).post(postPostEdit);
postRouter.route("/:id([0-9a-f]{24})/delete").get(deletePost);

export default postRouter;
