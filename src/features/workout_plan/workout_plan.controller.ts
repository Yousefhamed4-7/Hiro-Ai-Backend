import { Response, Request, NextFunction } from "express";
import WorkoutPlan from "./workout_plan.model";
import {
  workoutPlanParameterSchema,
  workoutPlanSchema,
} from "./workout_plan.schema";
import z from "zod";

export const getAll = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const workoutPlan = await WorkoutPlan.find({});

  return res.json({
    success: true,
    status: 200,
    message: "Workout plan fetched successfully",
    data: workoutPlan,
  });
};

export const getOne = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const workoutPlanId = workoutPlanParameterSchema.safeParse(req.params);

  if (!workoutPlanId.success) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Validation error",
      data: z.treeifyError(workoutPlanId.error),
    });
  }

  const workoutPlan = await WorkoutPlan.findById(workoutPlanId.data.id);

  if (!workoutPlan) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "Workout Plan not found",
      data: null,
    });
  }

  return res.json({
    success: true,
    status: 200,
    message: "Workout Plan fetched successfully",
    data: workoutPlan,
  });
};

export const create = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const parsedWorkoutPlanData = workoutPlanSchema.safeParse(req.body);

  if (!parsedWorkoutPlanData.success) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Validation error",
      data: z.treeifyError(parsedWorkoutPlanData.error),
    });
  }

  try {
    const newWorkoutPlan = await new WorkoutPlan(parsedWorkoutPlanData.data);
    await newWorkoutPlan.save();

    return res.status(201).json({
      success: true,
      status: 201,
      message: "Workout Plan successfully created",
      data: newWorkoutPlan,
    });
  } catch (err: any) {
    next(err);
  }
};

export const update = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const workoutPlanId = workoutPlanParameterSchema.safeParse(req.params);

  if (!workoutPlanId.success) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Validation error",
      data: z.treeifyError(workoutPlanId.error),
    });
  }

  const parsedWorkoutPlan = workoutPlanSchema.safeParse(req.body);

  if (!parsedWorkoutPlan.success) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Validation error",
      data: z.treeifyError(parsedWorkoutPlan.error),
    });
  }

  const workoutPlan = await WorkoutPlan.findById(workoutPlanId.data.id);

  if (!workoutPlan) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "Workout Plan not found",
      data: null,
    });
  }

  try {
    const updatedWorkoutPlan = workoutPlan.set(parsedWorkoutPlan.data);

    await updatedWorkoutPlan.save();

    return res.json({
      success: true,
      status: 200,
      message: "Workout Plan updated successfully",
      data: updatedWorkoutPlan,
    });
  } catch (err: any) {
    next(err);
  }
};

export const destroy = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const workoutPlanId = workoutPlanParameterSchema.safeParse(req.params);

  if (!workoutPlanId.success) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Validation Error",
      data: z.treeifyError(workoutPlanId.error),
    });
  }

  const workoutPlan = await WorkoutPlan.findById(workoutPlanId.data.id);

  if (!workoutPlan) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "Workout Plan Not Found",
      data: null,
    });
  }

  await workoutPlan.deleteOne();

  return res.json({
    success: true,
    status: 200,
    message: "Workout Plan deleted successfully",
    data: null,
  });
};

export const categories = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const workoutPlanCategories = await WorkoutPlan.find().select("category");

  return res.json({
    success: true,
    status: 200,
    message: "Workout Plan Categories fetched successfully",
    data: {
      total: workoutPlanCategories.length,
      items: workoutPlanCategories,
    },
  });
};
