import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";

import flash from "express-flash";
import { localMiddleware } from "./middleware.js";
import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";
import postRouter from "./routers/postRouter.js";
import apiRouter from "./routers/apiRouter.js";
import videoRouter from "./routers/videoRouter.js";

const app = express();
const logger = morgan("dev");

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
app.use(flash());
app.use(localMiddleware);
app.use("/etc", express.static("etc"));
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/user/static", express.static("assets"));
app.use("/", globalRouter);
app.use("/user", userRouter);
app.use("/post", postRouter);
app.use("/video", videoRouter);
app.use("/api", apiRouter);

export default app;
