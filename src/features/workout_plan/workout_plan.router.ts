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
workoutPlanRouter.get("/workout-plans", getAll);

workoutPlanRouter.get("/workout-plans/:id", getOne);

workoutPlanRouter.post("/workout-plans", create);

workoutPlanRouter.delete("/workout-plans/:id", destroy);

workoutPlanRouter.put("/workout-plans/:id", update);

// Endpoint stated inside the Reference
workoutPlanRouter.get("/categories", categories);

export default workoutPlanRouter;
