const User = require("../Models/UserModel");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({
      message: "User is not authenticated",
      success: false,
    });
  }
  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.json({
        message: "User is not authenticated",
        success: false,
      });
    } else {
      const { id } = decoded;
      const user = await User.findById(id);
      if (user)
        return res.json({
          message: "User is authenticated",
          success: true,
          user: user.username,
        });
    }
  });
};
