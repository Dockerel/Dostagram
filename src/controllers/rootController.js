import User from "../models/User.js";
import bcrypt from "bcrypt";
import Post from "../models/Post.js";
import Chat from "../models/Chat.js";
import Video from "../models/Video.js";

export const home = async (req, res) => {
  const posts = await Post.find({}).sort({ createdAt: -1 }).populate("owner");
  const chats = await Chat.find({}).populate("owner");
  const videos = await Video.find({}).populate("owner");
  res.render("home", { pageTitle: "Home", posts, chats, videos });
};

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res) => {
  const { name, username, password, password2, email } = req.body;

  if (password !== password2) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Password confirmation does not match.",
    });
  }

  const existsUsername = await User.exists({ username });
  const existsEmail = await User.exists({ email });
  if (existsUsername) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Username already exists.",
    });
  } else if (existsEmail) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: "Email already exists.",
    });
  }
  try {
    await User.create({
      name,
      username,
      password,
      password2,
      email,
    });
    return res.redirect("/login");
  } catch (error) {
    return res.status(400).render("join", {
      pageTitle: "Join",
      errorMessage: error._message,
    });
  }
};

export const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, socialOnly: false });
  if (!user) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "An account with this username does not exists.",
    });
  }
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(400).render("login", {
      pageTitle: "Login",
      errorMessage: "Wrong password",
    });
  }
  req.session.loggedIn = true;
  req.session.loggedInUser = user;
  res.redirect("/");
};

export const getSearch = (req, res) => {
  res.render("search", { pageTitle: "Search" });
};

export const postSearch = async (req, res) => {
  const { searchKeyword } = req.body;
  let posts = [];
  if (searchKeyword) {
    posts = await Post.find({
      content: {
        $regex: new RegExp(searchKeyword, "i"),
      },
    })
      .sort({ createdAt: "desc" })
      .populate("owner");
  }
  res.render("search", { pageTitle: "Search", posts });
};
