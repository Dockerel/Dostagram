import express from "express";
import {
  finishGithubLogin,
  finishKakaoLogin,
  finishNaverLogin,
  getEdit,
  getPwChange,
  inputKakaoData,
  logout,
  postEdit,
  postPwChange,
  profile,
  startGithubLogin,
  startKakaoLogin,
  startNaverLogin,
} from "../controllers/userController.js";
import {
  avatarUpload,
  loggedInUserOnly,
  publicUserOnly,
} from "../middleware.js";

const userRouter = express.Router();

userRouter.route("/:id([0-9a-f]{24})").get(profile);
userRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(loggedInUserOnly)
  .get(getEdit)
  .post(avatarUpload.single("avatar"), postEdit);
userRouter.route("/logout").all(loggedInUserOnly).get(logout);
userRouter.route("/github/start").all(publicUserOnly).get(startGithubLogin);
userRouter.route("/github/finish").all(publicUserOnly).get(finishGithubLogin);
userRouter.route("/kakao/start").all(publicUserOnly).get(startKakaoLogin);
userRouter
  .route("/kakao/finish")
  .all(publicUserOnly)
  .get(finishKakaoLogin)
  .post(inputKakaoData);
userRouter.route("/naver/start").all(publicUserOnly).get(startNaverLogin);
userRouter.route("/naver/finish").all(publicUserOnly).get(finishNaverLogin);
userRouter
  .route("/:id([0-9a-f]{24})/pw-change")
  .get(getPwChange)
  .post(postPwChange);

export default userRouter;
