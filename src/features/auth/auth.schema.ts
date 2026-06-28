import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z.email({ message: "Invalid email format" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

export const loginSchema = z.object({
  email: z.email({ message: "Invalid email format" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export const authHeaderSchema = z
  .string({ message: "Authorization header is required" })
  .regex(/^Bearer\s+\S+$/, {
    message: "Invalid authorization format. Expected 'Bearer <token>'",
  });

export const refreshSchema = z.object({
  refreshToken: z.string().min(1, { message: "Refresh token is required" }),
});
