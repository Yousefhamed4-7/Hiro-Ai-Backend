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
mealsPlansRouter.get("/meal-plans", getAll);

mealsPlansRouter.get("/meal-plans/:id", getOne);

mealsPlansRouter.post("/meal-plans", create);

mealsPlansRouter.delete("/meal-plans/:id", destroy);

mealsPlansRouter.put("/meal-plans/:id", update);

// Endpoint stated inside the Reference
mealsPlansRouter.get("/meal-categories", mealCategories);

mealsPlansRouter.get("/meal-search", mealSearch);

export default mealsPlansRouter;
