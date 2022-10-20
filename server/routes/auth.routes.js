const router = require("express").Router();
const { login, signout, me,signup } = require("../controllers/auth.controller");
const {
  requireAuth,
  notRequireAuth,
} = require("../middleware/AuthMiddleware");

router.post("/login", notRequireAuth, login);
router.get("/logout", requireAuth, signout);
router.get("/me", me);
router.post("/signup",notRequireAuth, signup);

module.exports = router;
