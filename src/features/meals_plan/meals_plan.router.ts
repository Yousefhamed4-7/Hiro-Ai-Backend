import { Router } from "express";

const mealsPlansRouter = Router();


mealsPlansRouter.get("/");

mealsPlansRouter.get("/:id");

mealsPlansRouter.post("/");

mealsPlansRouter.delete("/:id");

mealsPlansRouter.put("/:id");


export default mealsPlansRouter;