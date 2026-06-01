import mongoose from "mongoose";
import { categoryModel } from "../models/category.model.js";
import * as categoryService from "../services/category.service.js";
import { AppError } from "../utils/AppError";
import { asyncHandler } from "../utils/asyncHandler";

export const createCategory = asyncHandler(async (req, res, next) => {
  const { title, description, icon } = req.body;

  if (!req.body) {
    return next(new AppError("title, description and icon are Required"));
  }
  const data = await categoryService.createCategoryService(req.body);

  return res.status(200).json({
    message: "Create Category Successfully",
    data: data,
  });
});
