// require jwt
const jwt = require("jsonwebtoken");
// require admin model
const Admin = require("../models/admin.model");
// require validation schema
const adminSchema = require("../controllers/validation/authAdminValidation");
// create function
const authMiddleware = async (req, res, next) => {
  try {
    // get token from header
    const token =
      req.header("Authorization") && req.header("Authorization").split(" ")[1];
    // check if token exists
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    // verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // get admin from token
    const admin = await Admin.findById(decoded.id);
    // check if admin exists
    if (!admin) {
      return res
        .status(401)
        .json({ msg: "Admin not found, authorization denied" });
    }
    req.admin = admin;
    next();
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Internal Server Error", error: error.message });
  }
};
// export module
module.exports = authMiddleware;
