const router = require("express").Router();
const { register, login ,getMe} = require("../controllers/authController");
const auth = require("../middlewares/auth");


router.post("/register", register);
router.post("/login", login);
router.get("/me", auth.protect, getMe);

module.exports = router;