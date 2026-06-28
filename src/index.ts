import mongoose from "mongoose";
import express, { Request, Response, NextFunction } from "express";
import helmet from "helmet";
import cors from "cors";

// Importing config, Middlewares & Routers
import { config } from "./config/index.js";
import authRouter from "./features/auth/auth.router.js";
import errorMiddleware from "./shared/middlewares/error.middleware.js";

mongoose
  .connect(config.mongoUri)
  .then(() => {
    console.log("Connected to MongoDB Successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  });

const app = express();

// Middlewares
app.use(helmet());
app.use(express.json());
app.use(cors());

// Routers
app.use("/api/v2/auth", authRouter);

app.get("/health", (_req: Request, res: Response, _next: NextFunction) => {
  res.json({
    success: true,
    status: 200,
    message: "Server is running",
    data: null,
  });
});

app.use((_req: Request, res: Response, _next: NextFunction) => {
  res.status(404).json({
    success: false,
    status: 404,
    message: "Route not found",
    data: null,
  });
});

// Error handling middleware
app.use(errorMiddleware);

app.listen(config.port, () => {
  console.log(`Server Running On Port: ${config.port}`);
});
