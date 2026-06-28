import { Router } from "express";
import { signup, login, logout, refresh } from "./auth.controller.js";
import authMiddleware from "./auth.middleware.js";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.post("/refresh", refresh);
authRouter.post("/logout", authMiddleware, logout);

export default authRouter;
