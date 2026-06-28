import { Request } from "express";

export interface AuthRequest extends Request {
  user_id: string;
}

export interface DecodedToken {
  user_id: string;
}
