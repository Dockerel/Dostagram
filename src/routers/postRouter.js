import express from "express";
import { writePost } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.route("/write").get(writePost);

export default postRouter;
