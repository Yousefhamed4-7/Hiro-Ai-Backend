import { Router } from "express";

import { getAll } from "./meals_plan.controller.js";

import authMiddleware from "../../shared/middlewares/auth.middleware.js";

const mealsPlansRouter = Router();

mealsPlansRouter.use(authMiddleware);

mealsPlansRouter.get("/", getAll);

// mealsPlansRouter.get("/:id");

// mealsPlansRouter.post("/");

// mealsPlansRouter.delete("/:id");

// mealsPlansRouter.put("/:id");

export default mealsPlansRouter;
