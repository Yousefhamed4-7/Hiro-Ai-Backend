import mongoose, { Schema } from "mongoose";
import type { Document } from "mongoose";

export interface IWorkoutPlanCategory extends Document {
  name_en: string;
  name_ar: string;
  description_en: string;
  description_ar: string;
}

const workoutPlanCategorySchema = new Schema<IWorkoutPlanCategory>({
  name_en: {
    type: String,
    unique: true,
    required: [true, "English Workout Plan Category name is required"],
    trim: true,
  },
  name_ar: {
    type: String,
    unique: true,
    required: [true, "Arabic Workout Plan Category name is required"],
    trim: true,
  },
  description_en: {
    type: String,
    required: [true, "English Workout Plan Category description is required"],
    trim: true,
  },
  description_ar: {
    type: String,
    required: [true, "Arabic Workout Plan Category description is required"],
    trim: true,
  },
});

const WorkoutPlanCategory = mongoose.model(
  "workoutPlanCategory",
  workoutPlanCategorySchema,
);

export default WorkoutPlanCategory;
