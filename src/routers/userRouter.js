import express from "express";
import { logout } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("logout").get(logout);

export default userRouter;
