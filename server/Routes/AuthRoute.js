const { Signup, Login } = require("../Controllers/AuthController");
const express = require("express");
const { userVerification } = require("../Middlewares/AuthMiddleware");
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post('/',userVerification)

module.exports = router;
