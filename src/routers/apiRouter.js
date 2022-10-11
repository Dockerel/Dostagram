import express from "express";
import { createChat } from "../controllers/chatController.js";
import {
  createComment,
  deleteComment,
} from "../controllers/videoController.js";
import { loggedInUserOnly } from "../middleware.js";

const apiRouter = express.Router();

apiRouter.route("/chat/create").all(loggedInUserOnly).post(createChat);
apiRouter
  .route("/:id([0-9a-f]{24})/comment/create")
  .all(loggedInUserOnly)
  .post(createComment);
apiRouter
  .route("/:id([0-9a-f]{24})/comment/delete")
  .all(loggedInUserOnly)
  .post(deleteComment);

export default apiRouter;
