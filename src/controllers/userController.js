export const logout = (req, res) => {
  req.session.loggedIn = false;
  req.session.loggedInUser = null;
  res.locals.loggedIn = req.session.loggedIn;
  res.locals.loggedInUser = req.session.loggedInUser;
  return res.redirect("/");
};
