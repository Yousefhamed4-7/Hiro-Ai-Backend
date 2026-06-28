import mongoose, { Schema } from "mongoose";
import type { Document } from "mongoose";

export interface IMealPlanCategory extends Document {
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
  image?: string;
}

const mealPlanCategorySchema = new Schema<IMealPlanCategory>({
  name_en: {
    type: String,
    unique: true,
    required: [true, "English Meal Plan Category name is required"],
    trim: true,
  },
  name_ar: {
    type: String,
    unique: true,
    required: [true, "Arabic Meal Plan Category name is required"],
  },
  description_en: {
    type: String,
    required: [true, "English Meal Plan Category description is required"],
    trim: true,
  },
  description_ar: {
    type: String,
    required: [true, "Arabic meal plan category description is required"],
    trim: true,
  },
  image: {
    type: String,
    default: "",
  },
});

const MealPlanCategory = mongoose.model(
  "mealPlanCategory",
  mealPlanCategorySchema,
);

export default MealPlanCategory;
