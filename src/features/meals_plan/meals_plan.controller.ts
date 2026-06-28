import MealPlan from "./meals_plan.model.js";
import type { Request, Response, NextFunction } from "express";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const mealPlans = await MealPlan.find({});

    res.json({
      success: true,
      status: 200,
      message: "Plans fetched successfully",
      data: mealPlans,
    });
  } catch (err: any) {
    next(err);
  }
};
