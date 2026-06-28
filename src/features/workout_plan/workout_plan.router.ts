import { Router } from "express";

import {
  getAll,
  getOne,
  create,
  update,
  destroy,
  categories,
} from "./workout_plan.controller";

import authMiddleware from "../../shared/middlewares/auth.middleware";

const workoutPlanRouter = Router();

workoutPlanRouter.use(authMiddleware);

// Crud Endpoints
workoutPlanRouter.get("/workout-plan", getAll);

workoutPlanRouter.get("/workout-plan/:id", getOne);

workoutPlanRouter.post("/workout-plan", create);

workoutPlanRouter.delete("/workout-plan/:id", destroy);

workoutPlanRouter.put("/workout-plan/:id", update);

// Endpoint stated inside the Reference
workoutPlanRouter.get("/categories", categories);

export default workoutPlanRouter;
