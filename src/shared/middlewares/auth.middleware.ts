import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { AuthRequest, DecodedToken } from "../../shared/types";
import { config } from "../../config/index";
import { authHeaderSchema } from "../schema/header.schema";

const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = authHeaderSchema.safeParse(req.headers.authorization);
  if (!result.success) {
    return res.status(401).json({
      success: false,
      status: 401,
      message: "Unauthorized",
      errors: z.treeifyError(result.error),
      // errors: result.error.flatten().formErrors,
    });
  }

  const token = result.data.split(" ")[1];
  try {
    const decoded = jwt.verify(token, config.jwt.accessSecret) as DecodedToken;
    (req as AuthRequest).user_id = decoded.user_id;
    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Token expired",
      });
    }

    return res.status(401).json({
      success: false,
      status: 401,
      message: "Invalid token",
    });
  }
};

export default authMiddleware;
