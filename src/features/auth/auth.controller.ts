import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import {z} from 'zod'
import bcrypt from "bcrypt";
import User from "./user.model.js";
import { signupSchema, loginSchema, refreshSchema } from "./auth.schema.js";
import { config } from "../../config/index.js";
import { DecodedToken } from "../../shared/types.js";

export const signup = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const result = signupSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Validation error",
        errors: z.treeifyError(result.error),
      });
    }

    const { username, email, password } = result.data;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        status: 409,
        message: "Email already in use",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    const accessToken = jwt.sign({ user_id: newUser._id }, config.jwt.accessSecret, {
      expiresIn: config.jwt.accessExpiresIn,
    });

    const refreshToken = jwt.sign(
      { user_id: newUser._id },
      config.jwt.refreshSecret,
      {
        expiresIn: config.jwt.refreshExpiresIn,
      },
    );

    res.status(201).json({
      success: true,
      status: 201,
      message: "User registered successfully",
      data: {
        user: newUser,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const result = loginSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Validation error",
        errors: z.treeifyError(result.error),
      });
    }

    const { email, password } = result.data;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User not found",
        data: null,
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Invalid credentials",
        data: null,
      });
    }

    const accessToken = jwt.sign({ user_id: user._id }, config.jwt.accessSecret, {
      expiresIn: config.jwt.accessExpiresIn,
    });

    const refreshToken = jwt.sign({ user_id: user._id }, config.jwt.refreshSecret, {
      expiresIn: config.jwt.refreshExpiresIn,
    });

    res.status(200).json({
      success: true,
      status: 200,
      message: "Login successful",
      data: {
        user,
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  try {
    const result = refreshSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Validation error",
        errors: z.treeifyError(result.error),
      });
    }

    const { refreshToken } = result.data;

    let payload: DecodedToken;
    try {
      payload = jwt.verify(
        refreshToken,
        config.jwt.refreshSecret,
      ) as DecodedToken;
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({
          success: false,
          status: 401,
          message: "Refresh token expired",
        });
      }

      return res.status(401).json({
        success: false,
        status: 401,
        message: "Invalid refresh token",
      });
    }

    const user = await User.findById(payload.user_id);
    if (!user) {
      return res.status(401).json({
        success: false,
        status: 401,
        message: "Invalid or expired refresh token",
      });
    }

    const newAccessToken = jwt.sign({ user_id: user._id }, config.jwt.accessSecret, {
      expiresIn: config.jwt.accessExpiresIn,
    });

    res.status(200).json({
      success: true,
      status: 200,
      message: "Token refreshed successfully",
      data: {
        accessToken: newAccessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<any> => {
  return res.status(200).json({
    success: true,
    status: 200,
    message: "Logout successful",
  });
};
