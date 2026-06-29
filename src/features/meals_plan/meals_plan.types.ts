import type mongoose from "mongoose";

export interface MealCategorySummary {
  _id: string;
  name_en: string;
  name_ar: string;
  description_en?: string;
  description_ar?: string;
  image?: string;
}

export interface MealSearchFilter {
  name?: {
    $regex: string;
    $options: string;
  };
  category?: mongoose.Types.ObjectId;
}

export interface MealSearchItem {
  meal_name: string;
  calories: number;
  protein_g: number;
  carbs_g: number;
  fat_g: number;
  images?: string[];
}
