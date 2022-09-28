import express from "express";
import {
  finishGithubLogin,
  finishKakaoLogin,
  inputKakaoData,
  logout,
  startGithubLogin,
  startKakaoLogin,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/logout").get(logout);
userRouter.route("/github/start").get(startGithubLogin);
userRouter.route("/github/finish").get(finishGithubLogin);
userRouter.route("/kakao/start").get(startKakaoLogin);
userRouter.route("/kakao/finish").get(finishKakaoLogin).post(inputKakaoData);

export default userRouter;
