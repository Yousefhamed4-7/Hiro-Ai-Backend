import mongoose, { Schema, Types } from "mongoose";
import type { Document } from "mongoose";
import { IWorkoutPlanCategory } from "./workout_plan_category_model";

export interface IExercise extends Document {
  exercise_order: number;
  exercise_name: string;
  //   TODO: optional idk?
  sets: number;
  //   TODO: also Optional?
  reps: string;
  duration_seconds?: number | null;
  rest_seconds: number;
  notes: string;
  images?: string[];
  videos?: string[];
}

export interface IWorkoutPlan extends Document {
  workout_code: string;
  name: string;
  category: IWorkoutPlanCategory;
  goal: "LW" | "BM" | "MC" | "RI";
  difficulty: "beginner" | "intermediate" | "advanced";
  //   TODO: dont know if its required or not
  duration_minutes?: number;
  target_muscle_groups: string[];
  //   TODO: can be zero?
  estimated_calories: number;
  gender_preference: "male" | "female" | "any";
  description: string;
  exercise_count: number;
  exercises: IExercise[];
  images?: string[];
  videos?: string[];
  //   TODO: Implement this favourite thingy
  //   favorite_id: 512;
  //   is_favorite: true;
}

const exerciseSchema = new Schema<IExercise>({
  exercise_order: {
    type: Number,
  },
  exercise_name: {
    type: String,
    required: [true, "Exercise name is required"],
    unique: true,
  },
  sets: {
    type: Number,
  },
  //   TODO: also Optional?
  reps: {
    type: String,
    trim: true,
  },
  duration_seconds: {
    type: Number,
    default: null,
  },
  rest_seconds: {
    type: Number,
  },
  notes: {
    type: String,
  },
  images: {
    type: [String],
    default: [],
  },
  videos: {
    type: [String],
    default: [],
  },
});

const workoutPlanSchema = new Schema<IWorkoutPlan>({
  workout_code: {
    type: String,
    unique: true,
    trim: true,
  },
  name: {
    type: String,
    unique: true,
    trim: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "workoutPlanCategory",
    required: [true, "Workout Plan Category is required"],
  },
  goal: {
    type: String,
    enum: {
      values: ["LW", "BM", "MC", "RI"],
      message: "{VALUE} is not a valid Goal",
    },
    required: [true, "goal Is Reqruied"],
  },
  difficulty: {
    type: String,
    enum: {
      values: ["beginner", "intermediate", "advanced"],
      message: "{VALUE} is not a valid workout plan difficulty",
    },
  },
  duration_minutes: {
    type: Number,
    required: [true, "Workout Plan duration in minutes is required"],
  },
  target_muscle_groups: {
    type: [String],
    required: [true, "Workout Plan target muscle group is required"],
  },
  estimated_calories: {
    type: Number,
    required: [true, "Workout Plan estimated calories is required"],
  },
  gender_preference: {
    type: String,
    enum: {
      values: ["any", "male", "female"],
      message: "{VALUE} is not a valid gender prefrence",
    },
    lowercase: true,
  },
  description: {
    type: String,
    trim: true,
  },
  exercise_count: {
    type: Number,
  },
  exercises: [exerciseSchema],
  images: {
    type: [String],
    default: [],
  },
  videos: {
    type: [String],
    default: [],
  },
});

const WorkoutPlan = mongoose.model("workoutplan", workoutPlanSchema);

export default WorkoutPlan;
