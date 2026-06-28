import dotenv from "dotenv";
import type { SignOptions } from "jsonwebtoken";

dotenv.config();

// Validate required environment variables before exporting configuration
const requiredEnvVars = [
  "MONGO_URI",
  "JWT_ACCESS_SECRET",
  "JWT_ACCESS_EXPIRES_IN",
  "JWT_REFRESH_SECRET",
  "JWT_REFRESH_EXPIRES_IN",
  "PORT",
] as const;
const missingVars = requiredEnvVars.filter((varName) => !process.env[varName]);

if (missingVars.length > 0) {
  console.error(
    `Error: Required environment variable(s) missing: ${missingVars.join(", ")}`,
  );
  process.exit(1);
}

export const config = {
  port: parseInt(process.env.PORT as string, 10),
  nodeEnv: process.env.NODE_ENV || "development",
  mongoUri: process.env.MONGO_URI as string,
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET as string,
    accessExpiresIn: process.env
      .JWT_ACCESS_EXPIRES_IN as SignOptions["expiresIn"],
    refreshSecret: process.env.JWT_REFRESH_SECRET as string,
    refreshExpiresIn: process.env
      .JWT_REFRESH_EXPIRES_IN as SignOptions["expiresIn"],
  },
};
