import {z} from 'zod';


export const authHeaderSchema = z
  .string({ message: "Authorization header is required" })
  .regex(/^Bearer\s+\S+$/, {
    message: "Invalid authorization format. Expected 'Bearer <token>'",
  });