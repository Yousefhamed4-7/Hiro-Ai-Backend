import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  code?: number;
  errors?: Record<string, { message: string }>;
  keyValue?: Object;
}

const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err.name === "ValidationError" && err.errors) {
    return res.status(400).json({
      success: false,
      status: 400,
      message: "Validation error",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  if (err.code === 11000) {
    const duplicatedField = Object.keys(err.keyValue ?? {})[0];

    return res.status(409).json({
      success: false,
      status: 409,
      message: "Duplicate key error",
      errors: duplicatedField
        ? `${duplicatedField} is already being used`
        : err.message,
    });
  }

  return res.status(500).json({
    success: false,
    status: 500,
    message: "Internal server error",
    errors: err.message ?? "Something Went Wrong",
  });
};

export default errorMiddleware;
