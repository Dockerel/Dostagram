import express from "express";
import { createChat } from "../controllers/chatController.js";

const apiRouter = express.Router();

apiRouter.post("/chat/create", createChat);

export default apiRouter;
