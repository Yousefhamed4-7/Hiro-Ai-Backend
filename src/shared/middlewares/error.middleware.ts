import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  code?: number;
  errors?: Record<string, { message: string }>;
}

const errorMiddleware = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);

  if (err.name === "ValidationError" && err.errors) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Validation error",
      data: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.code === 11000) {

    return res.status(400).json({
      success: false,
      status: 400,
      message: "Duplicate key error",
      data: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    status: 500,
    message: "Internal server error",
    data: null,
  });
};

export default errorMiddleware;
