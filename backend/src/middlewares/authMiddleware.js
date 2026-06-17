// require jwt
import jwt from "jsonwebtoken";
// require admin model
// import { Admin } from "../models/admin.model";
// require validation schema
// import adminSchema from "../controllers/validation/authAdminValidation";
import { env } from "../config/env.js";
import { User } from "../models/user.model.js";
// create function
export const protect = async (req, res, next) => {
  // const authMiddleware = async (req, res, next) => {
  try {
    // get token from header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401);
      throw new Error("Not authorized");
    }

    const token = authHeader && authHeader.split(" ")[1];

    // check if token exists
    if (!token) {
      return res.status(401).json({ msg: "No token, authorization denied" });
    }
    // verify token
    const decoded = jwt.verify(token, env.jwtSecret);
    // get user from token
    const user = await User.findById(decoded.id);
    // check if user exists
    if (!user || !user.isActive) {
      return res
        .status(401)
        .json({ msg: "User not found or inactive, authorization denied" });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401);
    next(new Error("Not authorized"));
  }
};

// will make also role based authorization later
// 
