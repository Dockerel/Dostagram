import multer from "multer";

export const localMiddleware = (req, res, next) => {
  res.locals.loggedIn = Boolean(req.session.loggedIn);
  res.locals.loggedInUser = req.session.loggedInUser;
  next();
};

export const loggedInUserOnly = (req, res, next) => {
  if (!req.session.loggedIn) {
    req.flash("error", "Not Authorized");
    return res.redirect("/login");
  } else {
    next();
  }
};

export const publicUserOnly = (req, res, next) => {
  if (req.session.loggedIn) {
    req.flash("error", "Not Authorized");
    return res.redirect("/");
  } else {
    next();
  }
};

export const avatarUpload = multer({
  dest: "uploads/avatar",
  limits: { fileSize: 3000000 },
});

export const postImageUpload = multer({
  dest: "uploads/postImages",
  limits: { fileSize: 10000000 },
});

export const videoUpload = multer({
  dest: "uploads/videos",
  limits: { fileSize: 10000000 },
});
