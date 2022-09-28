import express from "express";
import {
  finishGithubLogin,
  finishKakaoLogin,
  finishNaverLogin,
  getEdit,
  inputKakaoData,
  logout,
  postEdit,
  profile,
  startGithubLogin,
  startKakaoLogin,
  startNaverLogin,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/:id([0-9a-f]{24})").get(profile);
userRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
userRouter.route("/logout").get(logout);
userRouter.route("/github/start").get(startGithubLogin);
userRouter.route("/github/finish").get(finishGithubLogin);
userRouter.route("/kakao/start").get(startKakaoLogin);
userRouter.route("/kakao/finish").get(finishKakaoLogin).post(inputKakaoData);
userRouter.route("/naver/start").get(startNaverLogin);
userRouter.route("/naver/finish").get(finishNaverLogin);

export default userRouter;
