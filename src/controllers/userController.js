import { token } from "morgan";
import fetch from "node-fetch";
import User from "../models/User.js";

let kakaoTempData;

export const logout = (req, res) => {
  req.session.loggedIn = false;
  req.session.loggedInUser = null;
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.loggedInUser = req.session.loggedInUser;
  return res.redirect("/");
};

export const startGithubLogin = (req, res) => {
  const baseUrl = "https://github.com/login/oauth/authorize";
  const config = {
    client_id: process.env.GH_CLIENT_ID,
    scope: "read:user user:email",
    allow_signup: true,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
  const baseUrl = "https://github.com/login/oauth/access_token";
  const config = {
    client_id: process.env.GH_CLIENT_ID,
    client_secret: process.env.GH_CLIENT_SECRET,
    code: req.query.code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token } = tokenRequest;
    const apiUrl = "https://api.github.com";
    const userData = await (
      await fetch(`${apiUrl}/user`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();

    const emailData = await (
      await fetch(`${apiUrl}/user/emails`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
    ).json();
    const emailObj = emailData.find(
      (email) => email.primary === true && email.verified === true
    );
    if (!emailObj) {
      return res.render("login", {
        pageTitle: "Login",
        errorMessage: "No verified email exists",
      });
    }
    let user = await User.findOne({ email: emailObj.email });
    if (!user) {
      user = await User.create({
        name: userData.name,
        username: userData.login,
        password: "",
        email: emailObj.email,
        socialOnly: true,
      });
    }
    req.session.loggedIn = true;
    req.session.loggedInUser = user;
    return res.redirect("/");
  }
};

export const startKakaoLogin = async (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/authorize";
  const redirectUrl = "http://localhost:4000/user/kakao/finish";
  const config = {
    response_type: "code",
    client_id: process.env.KAKAO_REST_API_KEY,
    redirect_uri: redirectUrl,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  res.redirect(finalUrl);
};

export const finishKakaoLogin = async (req, res) => {
  const baseUrl = "https://kauth.kakao.com/oauth/token";
  const redirectUrl = "http://localhost:4000/user/kakao/finish";
  const { code } = req.query;
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.KAKAO_REST_API_KEY,
    redirect_uri: redirectUrl,
    code: code,
  };
  const params = new URLSearchParams(config).toString();
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const apiUrl = "https://kapi.kakao.com/v2/user/me";
    const { access_token } = tokenRequest;
    const { token_type } = tokenRequest;
    const responseData = await (
      await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `${token_type} ${access_token}`,
        },
      })
    ).json();
    const userData = responseData.kakao_account;
    if (
      userData.has_email &&
      userData.is_email_valid &&
      userData.is_email_verified
    ) {
      const user = await User.findOne({ email: userData.email });
      if (!user) {
        kakaoTempData = userData;
        return res.render("loginKakaoPlus", {
          pageTitle: "Join by Kakao",
          userData,
        });
      }
      req.session.loggedIn = true;
      req.session.loggedInUser = user;
      return res.redirect("/");
    } else {
      return res.render("login", {
        pageTitle: "Login",
        errorMessage: "Error occurred. Use Join tab to make Account.",
      });
    }
  }
};

export const inputKakaoData = async (req, res) => {
  const { username } = req.body;
  const exists = await User.exists({ username });
  const userData = kakaoTempData;
  if (exists) {
    return res.render("loginKakaoPlus", {
      pageTitle: "Join by Kakao",
      userData,
      errorMessage: "Same username already exists.",
    });
  }
  const user = await User.create({
    name: userData.profile.nickname,
    username,
    password: "",
    email: userData.email,
    socialOnly: true,
  });
  kakaoTempData = "";
  req.session.loggedIn = true;
  req.session.loggedInUser = user;
  return res.redirect("/");
};

export const startNaverLogin = (req, res) => {
  const baseUrl = "https://nid.naver.com/oauth2.0/authorize";
  const redirectUrl = "http://localhost:4000/user/naver/finish";
  const config = {
    response_type: "code",
    client_id: process.env.NAVER_CLIENT_ID,
    redirect_uri: redirectUrl,
    state: process.env.NAVER_STATE_STRING,
  };
  const params = new URLSearchParams(config);
  const finalUrl = `${baseUrl}?${params}`;
  return res.redirect(finalUrl);
};
export const finishNaverLogin = async (req, res) => {
  const { code } = req.query;
  const baseUrl = "https://nid.naver.com/oauth2.0/token";
  const config = {
    grant_type: "authorization_code",
    client_id: process.env.NAVER_CLIENT_ID,
    client_secret: process.env.NAVER_CLIENT_SECRET,
    code,
    state: process.env.NAVER_STATE_STRING,
  };
  const params = new URLSearchParams(config);
  const finalUrl = `${baseUrl}?${params}`;
  const tokenRequest = await (
    await fetch(finalUrl, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
    })
  ).json();
  if ("access_token" in tokenRequest) {
    const { access_token, token_type } = tokenRequest;
    const baseUrl = "https://openapi.naver.com/v1/nid/me";
    const responseData = await (
      await fetch(baseUrl, {
        headers: {
          Authorization: `${token_type} ${access_token}`,
          Accept: "application/json",
        },
      })
    ).json();
    const userData = responseData.response;
    let user = await User.findOne({ email: userData.email });
    if (!user) {
      user = await User.create({
        name: userData.name,
        username: userData.nickname,
        password: "",
        email: userData.email,
        socialOnly: true,
      });
    }
    req.session.loggedIn = true;
    req.session.loggedInUser = user;
    res.redirect("/");
  }
};

export const profile = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(404).render("404", { pageTitle: "404:Not Found" });
  }
  res.render("profile", {
    pageTitle: `${user.username}'s Profile`,
    user,
  });
};

export const getEdit = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) {
    return res.status(404).render("404", { pageTitle: "404:Not Found" });
  }
  res.render("edit-profile", {
    pageTitle: `Edit ${user.username}'s Profile`,
    user,
  });
};
export const postEdit = (req, res) => {};
