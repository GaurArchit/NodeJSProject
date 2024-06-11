import Router from "express";
import home from "./home.js";
import login from "./login.js";
import dashboard from "./dashboard.js";
import protectRoute from "../../utils/protechRoute.js";
import logout from "./logout.js";
import moderatePost from "./moderate-post.js";
const router = Router();

router.get("/", home);
router
  .route("/login")
  .get((req, res) => res.render("login"))
  .post(login);

router.get("/dashboard", protectRoute("/admin/login"), dashboard);
router.get("/logout", logout);
router.post("/moderatePost", protectRoute("/admin/login"), moderatePost);
export default router;
