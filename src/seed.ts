import mongoose from "mongoose";
import MealPlan from "./features/meals_plan/meals_plan.model";
import { config } from "./config/index";
import MealPlanCategory from "./features/meals_plan/meal_plan_category.model";
import WorkoutPlanCategory from "./features/workout_plan/workout_plan_category_model";
import WorkoutPlan from "./features/workout_plan/workout_plan.model";
import User from "./features/auth/user.model";

async function connect(): Promise<void> {
  try {
    await mongoose.connect(config.mongoUri);
  } catch (err) {
    console.log("Error Connecting to mongodb");
    console.error(err);
    process.exit(1);
  }
}

async function seed(): Promise<void> {
  await connect();

  const mealPlanCategory = new MealPlanCategory({
    name_en: "Muscle Gain",
    name_ar: "بناء العضلات",
    description_en: "...",
    description_ar: "...",
  });

  await mealPlanCategory.save();

  const mealPlanData = {
    plan_code: "ML-014",
    name: "High-Protein Day",
    goal: "BM",
    target_calories: 2100.0,
    category: mealPlanCategory._id,
    meals: [
      {
        meal_name: "Grilled Chicken & Rice",
        calories: 620.0,
        protein_g: 52.0,
        carbs_g: 61.0,
        fat_g: 14.0,
        ingredients: [
          {
            name_en: "Chicken Breast",
            name_ar: "صدر دجاج",
            quantity: 200.0,
            unit: "g",
            calories: 330.0,
            protein_g: 62.0,
            carbs_g: 0.0,
            fat_g: 7.0,
            image:
              "https://as2.ftcdn.net/v2/jpg/02/12/64/71/1000_F_212647173_WIbVWFgRzvoE74HzmyugWddOhHcxXQUu.jpg",
          },
        ],
        images: [
          "https://as2.ftcdn.net/v2/jpg/02/12/64/71/1000_F_212647173_WIbVWFgRzvoE74HzmyugWddOhHcxXQUu.jpg",
        ],
        videos: [
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        ],
      },
    ],
  };

  const mealPlan = new MealPlan(mealPlanData);

  await mealPlan.save();

  const workoutPlanCategory = new WorkoutPlanCategory({
    name_en: "Strength",
    name_ar: "القوة",
    description_en: "...",
    description_ar: "...",
  });

  await workoutPlanCategory.save();

  const workoutPlanData = {
    workout_code: "WK-021",
    name: "Upper Body Strength",
    category: workoutPlanCategory._id,
    goal: "BM",
    difficulty: "intermediate",
    duration_minutes: 45,
    target_muscle_groups: ["chest", "back", "shoulders"],
    estimated_calories: 320.0,
    gender_preference: "any",
    description: "A 45-minute upper-body session.",
    exercise_count: 6,
    exercises: [
      {
        id: 88,
        exercise_order: 1,
        exercise_name: "Barbell Bench Press",
        sets: 4,
        reps: "8-10",
        duration_seconds: null,
        rest_seconds: 90,
        notes: "Controlled tempo.",
        images: [
          "https://as1.ftcdn.net/v2/jpg/02/26/50/62/1000_F_226506291_imi0vFPQCeAfGGXnqkv3YuvZrJnhrdcP.jpg",
        ],
        videos: [
          "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        ],
      },
    ],
    images: [
      "https://as1.ftcdn.net/v2/jpg/02/26/50/62/1000_F_226506291_imi0vFPQCeAfGGXnqkv3YuvZrJnhrdcP.jpg",
    ],
    videos: [
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    ],
  };

  const workoutPlan = new WorkoutPlan(workoutPlanData);

  await workoutPlan.save();

  console.log("Database Seeded");

  process.exit(0);
}

async function clear(): Promise<void> {
  await connect();

  await WorkoutPlanCategory.deleteMany({});

  await WorkoutPlan.deleteMany({});

  await MealPlanCategory.deleteMany({});

  await MealPlan.deleteMany({});

  await User.deleteMany({});

  console.log("Database Cleared\n");
}

async function main(): Promise<void> {
  console.log("\Clearing Database...\n");
  await clear();
  console.log("Seeding Database...\n");
  await seed();
}

main();
