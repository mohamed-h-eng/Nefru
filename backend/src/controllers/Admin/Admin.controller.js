import mongoose from "mongoose";

import {User, USER_ROLES} from '../../models/user.model.js'
import {Trip} from '../../models/trip.model.js'

// Single error-response contract for every admin handler
const sendError = (res, status, message, code, details = []) =>
  res.status(status).json({ success: false, message, error: { code, details } });

// Reject a malformed :id before the handler runs (applied in routes)
export const validateId = (req, res, next) => {
  if (!req.params.id || !mongoose.Types.ObjectId.isValid(req.params.id)) {
    return sendError(res, 400, "Invalid user ID", "VALIDATION_ERROR", ["The provided user ID is not a valid format"]);
  }
  next();
};

export const getUserById = async(req,res) =>{
  try{
    const userId = req.params.id;
    const user = await User.findById(userId)
    if(!user) return sendError(res, 404, "User not found", "NO_CONTENT_ERROR", ["User not registered"]);
    return res.status(200).json({
      success: true,
      message: "Operation completed successfully",
      data: user,
    })
  }catch(error){
    console.error("Error fetching user:", error);
    return sendError(res, 500, "An unexpected error occurred while fetching user", "INTERNAL_SERVER_ERROR");
  }
}

export const getAllUsers = async (req, res) => {
  try {
    let { role , page = 1 } = req.query;

    const currentPage = parseInt(page, 10);
    if (isNaN(currentPage) || currentPage < 1) {
      return sendError(res, 400, "Invalid page parameter", "VALIDATION_ERROR", ["Page must be a positive integer"]);
    }

    const filter = role ? { role } : {};
    const LIMIT = 10;
    const SKIP = (currentPage - 1) * LIMIT;

    const [users, total] = await Promise.all([
      User.find(filter)
        .sort({ createdAt: -1 })
        .skip(SKIP)
        .limit(LIMIT)
        .lean(),
      User.countDocuments(filter)
    ]);

    const totalPages = Math.max(1, Math.ceil(total / LIMIT));

    let pagingView = [];
    if (totalPages <= 3) {
      pagingView = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      const start = Math.max(1, currentPage - 1);
      const end = Math.min(totalPages, currentPage + 1);
      pagingView = Array.from({ length: end - start + 1 }, (_, i) => start + i);
      if (!pagingView.includes(1)) pagingView.unshift(1);
      if (!pagingView.includes(totalPages)) pagingView.push(totalPages);
    }

    return res.status(200).json({
      success: true,
      message: "Operation completed successfully",
      data: users,
      meta: {
        totalRecords: total,
        totalPages,
        recordsCount:users.length,
        currentPage,
        pagingView,
        headers:["USER","EMAIL","JOINED"],
        types: USER_ROLES
      }
    });

  } catch (error) {
    console.error("Error fetching accounts:", error);
    return sendError(res, 500, "An unexpected error occurred while fetching accounts", "INTERNAL_SERVER_ERROR");
  }
};

export const updateUserById = async(req,res)=>{
  try{
    const userId = req.params.id

    // Whitelist updatable fields to prevent mass assignment / privilege escalation
    const allowed = ["fullName", "email", "avatar", "isActive", "verificationStatus"];
    const data = Object.fromEntries(Object.entries(req.body).filter(([k]) => allowed.includes(k)));
    if (Object.keys(data).length === 0) {
      return sendError(res, 400, "No valid fields to update", "VALIDATION_ERROR", ["Request body contains no updatable fields"]);
    }

    const isUser = await User.findById(userId)
    if(!isUser) return sendError(res, 404, "User not found", "NO_CONTENT_ERROR", ["User not registered"]);

    const user = await User.findByIdAndUpdate(userId, data, { new: true, runValidators: true })
    return res.status(200).json({
      "success": true,
      "message": "Operation completed successfully",
      "data": user
    })
  }catch(error){
    // Duplicate key — e.g. email already belongs to another user
    if (error.code === 11000) {
      const field = Object.keys(error.keyValue || {})[0] || "field";
      return sendError(res, 409, "Conflict: a user with this email already exists", "DUPLICATE_ERROR", [`${field} must be unique`]);
    }

    console.error("Error updating user:", error);
    return sendError(res, 500, "An unexpected error occurred while updating user", "INTERNAL_SERVER_ERROR");
  }
}

export const getDashboard = async (req,res)=>{
  try{
    // get users
  }catch(error){

  }
}

export const banUserById = async(req,res)=>{
  try{
    const userId = req.params.id
    const isUser = await User.findById(userId)
    if(!isUser) return sendError(res, 404, "User not found", "NO_CONTENT_ERROR", ["User not registered"]);

    const user = await User.findByIdAndUpdate(userId, { isActive: false }, { new: true })
    return res.status(200).json({
      "success": true,
      "message": "Operation completed successfully",
      "data": user
    })
  }catch(error){
    console.error("Error banning user:", error);
    return sendError(res, 500, "An unexpected error occurred while banning user", "INTERNAL_SERVER_ERROR");
  }
}

export const unbanUserById = async(req,res)=>{
  try{
    const userId = req.params.id
    const isUser = await User.findById(userId)
    if(!isUser) return sendError(res, 404, "User not found", "NO_CONTENT_ERROR", ["User not registered"]);

    const user = await User.findByIdAndUpdate(userId, { isActive: true }, { new: true })
    return res.status(200).json({
      "success": true,
      "message": "Operation completed successfully",
      "data": user
    })
  }catch(error){
    console.error("Error unbanning user:", error);
    return sendError(res, 500, "An unexpected error occurred while unbanning user", "INTERNAL_SERVER_ERROR");
  }
}

export const deleteUserById = async(req,res)=>{
  try{
    const userId = req.params.id
    const isUser = await User.findById(userId)
    if(!isUser) return sendError(res, 404, "User not found", "NO_CONTENT_ERROR", ["User not registered"]);

    const user = await User.findByIdAndDelete(userId)
    return res.status(200).json({
      "success": true,
      "message": "Operation completed successfully",
      "data": user
    })
  }catch(error){
    console.error("Error deleting user:", error);
    return sendError(res, 500, "An unexpected error occurred while deleting user", "INTERNAL_SERVER_ERROR");
  }
}

export const getTrips = async(req,res)=>{
  try{
    //get all trips
    const {role,page} = req.params
    const currentPage = parseInt(page)

    const LIMIT = 10;
    const SKIP = (currentPage-1)*LIMIT

    const [trips, total] = await Promise.all([
      Trip.find()
      .skip(SKIP)
      .limit(LIMIT)
      .sort({createdAt:-1}),
      Trip.countDocuments()
    ])

    const totalPages = Math.ceil(total/LIMIT)

    // claculate pagination view
    let pagingView = []
    if(currentPage == totalPages){
      pagingView = [currentPage-1,currentPage]
    }else{
      pagingView = [currentPage,currentPage+1]
    }

    return res.status(200).json({
      "success": true,
      "message": "Operation completed successfully",
      "data": trips,
      "meta": {
        totalRecords:total,
        totalPages:totalPages,
        currentPage:parseInt(currentPage),
        headers:["TITLE","LOCATION","STATUS","RATE"]
      }
    })
  }catch(error){
    res.status(400).json({
      msg:"Failed",
      data:error})
  }
}

export const getBooking = async(req,res)=>{
  try{
    //get all trips
    const {role,page} = req.params
    return res.status(200).json({
      "success": true,
      "message": "Operation completed successfully",
      "data": trips,
      "meta": {
        totalRecords:total,
        totalPages:totalPages,
        currentPage:parseInt(currentPage),
        headers:["TITLE","LOCATION","STATUS","RATE"]
      }
    })
  }catch(error){
    res.status(400).json({
      msg:"Failed",
      data:error})
  }
}
