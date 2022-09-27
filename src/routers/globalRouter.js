import express from "express";
import {
  home,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  search,
} from "../controllers/rootController.js";

const globalRouter = express.Router();

globalRouter.route("/").get(home);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.route("/search").get(search);

export default globalRouter;
