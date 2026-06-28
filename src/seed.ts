import path from "path";
import mongoose from "mongoose";
import dotenv from "dotenv";
import MealPlan from "./features/meals_plan/meals_plan.model";
import { config } from "./config/index";

dotenv.config({ path: path.resolve(process.cwd(), "../", ".env") });

async function connect(): Promise<void> {
  try {
    await mongoose.connect(process.env.MONGO_URI as any);
  } catch (err) {
    console.log("Error Connecting to mongodb");
    console.error(err);
    process.exit(1);
  }
}

// TODO: Implement
async function seed(): Promise<void> {
  await connect();

  const meal_plan = {
    plan_code: "ML-014",
    name: "High-Protein Day",
    goal: "BM",
    target_calories: 2100.0,
    category: {
      id: 2,
      name_en: "Muscle Gain",
      name_ar: "بناء العضلات",
    },
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
            image: "https://dev.hiro.pro/uploads/ing/chicken.jpg",
          },
        ],
        images: ["https://dev.hiro.pro/uploads/meals/chickenrice.jpg"],
        videos: [],
      },
    ],
  };

  const plan1 = new MealPlan(meal_plan);

  await plan1.save();

  console.log(plan1);

  process.exit(0);
}

// TODO: Implement
async function clear(): Promise<void> {
  await connect();
}

seed();
