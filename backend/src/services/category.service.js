import mongoose from "mongoose";
import { categoryModel } from "../models/category.model";
import { AppError } from "../utils/AppError";

export async function createCategoryService(data) {
  return await categoryModel.create(data);
}

export async function getAllCategoryService() {
  return await categoryModel.find();
}

export async function findCategoryByIdService(id) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invaild Category ID, Or Not found", 404);
  }
  const category = await categoryModel.findOne(id);
  return category;
}

export async function updateCategoryService(id, data) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new AppError("Invaild Category ID, Or Not found", 404);
  }

  if (!Object.assign(findCategoryByIdService, data)) {
    throw new AppError("Data is required");
  }
  const updateCategory = await categoryModel.updateMany(id, data);
  return updateCategory;
}

export async function deleteCategoryByIdService(id) {
  return await categoryModel.findByIdAndDelete(id);
}
