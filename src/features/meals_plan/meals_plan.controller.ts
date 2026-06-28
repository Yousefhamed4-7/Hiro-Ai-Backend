import MealPlan from "./meals_plan.model";
import type { Request, Response, NextFunction } from "express";
import {
  mealsPlanSchema,
  mealsPlanUpdateQuerySchema,
} from "./meals_plan.schema";
import { z } from "zod";
import MealPlanCategory from "./meal_plan_category.model";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const mealPlans = await MealPlan.find({}).populate(
      "category",
      "name_en name_ar",
    );

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

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const parsedId = mealsPlanUpdateQuerySchema.safeParse(req.params);

  if (!parsedId.success) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Validation Error",
      data: z.treeifyError(parsedId.error),
    });
  }

  const mealPlan = await MealPlan.findById(parsedId.data.id).populate(
    "category",
    "name_en name_ar",
  );

  if (!mealPlan) {
    return res.status(400).json({
      success: false,
      status: 404,
      message: "Meal Plan not found",
      data: null,
    });
  }

  return res.json({
    success: true,
    status: 200,
    message: "Meal Plan fetched successfully",
    data: mealPlan,
  });
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = mealsPlanSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Validation error",
      data: z.treeifyError(result.error),
    });
  }

  const mealPlan = new MealPlan(result.data);

  await mealPlan.save();

  return res.status(201).json({
    success: true,
    status: 201,
    message: "Meal Plan created successfully",
    data: mealPlan,
  });
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const parsedId = mealsPlanUpdateQuerySchema.safeParse(req.params);

  if (!parsedId.success) {
    return res.status(400).json({
      success: false,
      status: 400,
      messsage: "Validation Error",
      data: z.treeifyError(parsedId.error),
    });
  }

  const mealPlan = await MealPlan.findById(parsedId.data.id);

  if (!mealPlan) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "Meal Plan Not Found",
      data: null,
    });
  }

  const parsedMealPlanData = mealsPlanSchema.safeParse(req.body);

  if (!parsedMealPlanData.success) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Validation Error",
      data: z.treeifyError(parsedMealPlanData.error),
    });
  }

  try {
    mealPlan.set(parsedMealPlanData.data);

    const updatedMealPlan = await mealPlan.save();

    return res.json({
      success: true,
      status: 200,
      message: "MealPlan updated successfully",
      data: updatedMealPlan,
    });
  } catch (e) {
    next(e);
  }
};

export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const parsedId = mealsPlanUpdateQuerySchema.safeParse(req.params);

  if (!parsedId.success) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Validation Error",
      data: z.treeifyError(parsedId.error),
    });
  }

  const mealPlan = await MealPlan.findById(parsedId.data.id);

  if (!mealPlan) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "Meal Plan not found",
      data: null,
    });
  }
  try {
    await mealPlan.deleteOne();

    return res.json({
      success: true,
      status: 200,
      messsage: "Meal Plan deleted successfully",
      data: null,
    });
  } catch (err: any) {
    next(err);
  }
};

export const mealCategories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const categories: any = await MealPlanCategory.find({});

  return res.json({
    sucess: true,
    status: 200,
    message: "Meal Categories fetched successfully",
    data: {
      total: categories.length,
      items: categories,
    },
  });
};
