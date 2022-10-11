import express from "express";
import {
  home,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  getSearch,
  postSearch,
} from "../controllers/rootController.js";
import { publicUserOnly } from "../middleware.js";

const globalRouter = express.Router();

globalRouter.route("/").get(home);
globalRouter.route("/join").all(publicUserOnly).get(getJoin).post(postJoin);
globalRouter.route("/login").all(publicUserOnly).get(getLogin).post(postLogin);
globalRouter.route("/search").get(getSearch).post(postSearch);

export default globalRouter;
