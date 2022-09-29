import "dotenv/config";
import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import "./db.js";
import "./models/User.js";
import { localMiddleware } from "./middleware.js";
import globalRouter from "./routers/globalRouter.js";
import userRouter from "./routers/userRouter.js";

const PORT = 4000;
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
app.use(localMiddleware);
app.use("/etc", express.static("etc"));
app.use("/uploads", express.static("uploads"));
app.use("/", globalRouter);
app.use("/user", userRouter);

const handleListening = () => {
  console.log(`✅ Server Listening on port ${PORT} | http://localhost:${PORT}`);
};

app.listen(PORT, handleListening);
