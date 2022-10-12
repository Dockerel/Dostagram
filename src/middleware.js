import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.AWS_ID,
    secretAccessKey: process.env.AWS_SECRET,
  },
});

const isHeroku = process.env.NODE_ENV === "production";

const s3AvatarUploader = multerS3({
  s3: s3,
  bucket: "dostagram/avatar",
  acl: "public-read",
});

const s3PostImageUploader = multerS3({
  s3: s3,
  bucket: "dostagram/postImage",
  acl: "public-read",
});

const s3VideoUploader = multerS3({
  s3: s3,
  bucket: "dostagram/video",
  acl: "public-read",
});

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
  storage: isHeroku ? s3AvatarUploader : undefined,
});

export const postImageUpload = multer({
  dest: "uploads/postImages",
  limits: { fileSize: 10000000 },
  storage: isHeroku ? s3PostImageUploader : undefined,
});

export const videoUpload = multer({
  dest: "uploads/videos",
  limits: { fileSize: 10000000 },
  storage: isHeroku ? s3VideoUploader : undefined,
});
