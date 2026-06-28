import { Router } from "express";

import {
  getAll,
  create,
  update,
  getOne,
  destroy,
  mealCategories,
  mealSearch,
} from "./meals_plan.controller";

import authMiddleware from "../../shared/middlewares/auth.middleware";

const mealsPlansRouter = Router();

mealsPlansRouter.use(authMiddleware);

// Crud Endpoints
mealsPlansRouter.get("/meals-plan", getAll);

mealsPlansRouter.get("/meals-plan/:id", getOne);

mealsPlansRouter.post("/meals-plan", create);

mealsPlansRouter.delete("/meals-plan/:id", destroy);

mealsPlansRouter.put("/meals-plan/:id", update);

// Endpoint stated inside the Reference
mealsPlansRouter.get("/meal-categories", mealCategories);

mealsPlansRouter.get("/meal-search", mealSearch);

export default mealsPlansRouter;
