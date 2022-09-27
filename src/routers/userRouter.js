import express from "express";
import {
  finishGithubLogin,
  logout,
  startGithubLogin,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/logout").get(logout);
userRouter.route("/github/start").get(startGithubLogin);
userRouter.route("/github/finish").get(finishGithubLogin);

export default userRouter;
