import { Router } from "express";

import {
  getAll,
  create,
  update,
  getOne,
  destroy,
} from "./meals_plan.controller";

import authMiddleware from "../../shared/middlewares/auth.middleware";

const mealsPlansRouter = Router();

mealsPlansRouter.use(authMiddleware);

mealsPlansRouter.get("/", getAll);

mealsPlansRouter.get("/:id", getOne);

mealsPlansRouter.post("/", create);

mealsPlansRouter.delete("/:id", destroy);

mealsPlansRouter.put("/:id", update);

export default mealsPlansRouter;
