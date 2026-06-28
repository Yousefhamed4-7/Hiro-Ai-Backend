import { z } from "zod";

export const exerciseSchema = z.object({
  exercise_order: z.number().int().min(1),
  exercise_name: z.string().min(1, "Exercise name is required"),
  sets: z.number().int().min(1),
  reps: z.string().min(1, "Reps description is required"), // e.g., "8-12" or "Max"
  duration_seconds: z.number().int().nullable().optional(), // Maps to: number | null | undefined
  rest_seconds: z.number().int().nonnegative(),
  notes: z.string().default(""),
  images: z.array(z.string().url()).optional().default([]),
  videos: z.array(z.string().url()).optional().default([]),
});

export const workoutPlanSchema = z.object({
  workout_code: z.string().min(1, "Workout code is required"),
  name: z.string().min(1, "Workout plan name is required"),

  category: z.string({ message: "Please provid workout category ID" }),

  goal: z.enum(["LW", "BM", "MC", "RI"]),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  gender_preference: z.enum(["male", "female", "any"]),

  duration_minutes: z.number().int().positive().optional(),
  target_muscle_groups: z
    .array(z.string())
    .min(1, "At least one target muscle group is required"),
  estimated_calories: z.number().nonnegative(),
  description: z.string().default(""),
  exercise_count: z.number().int().nonnegative(),
  exercises: z
    .array(exerciseSchema)
    .min(1, "A workout plan must contain at least one exercise"),

  images: z.array(z.url()).optional().default([]),
  videos: z.array(z.url()).optional().default([]),
});

export const workoutPlanParameterSchema = z.object({
  id: z.string(),
});

// export type ExerciseInput = z.infer<typeof exerciseSchema>;
// export type WorkoutPlanInput = z.infer<typeof workoutPlanSchema>;
