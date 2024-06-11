export default (req, res) => {
  const { email, password } = req.body;
  if (email === "architgaur" && password === "sam") {
    req.session.user = "Homer Simson";
    return res.redirect("/admin/dashboard"); // This is an absolute redirect parth
  }
  res.redirect("/admin/login");
};
