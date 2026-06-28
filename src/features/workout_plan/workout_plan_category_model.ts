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
    trim: true,
  },
  name_ar: {
    type: String,
    unique: true,
    trim: true,
  },
});

const WorkoutPlanCategory = mongoose.model(
  "workoutPlanCategory",
  workoutPlanCategorySchema,
);

export default WorkoutPlanCategory;
