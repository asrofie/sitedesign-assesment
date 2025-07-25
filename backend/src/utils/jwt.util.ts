import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import env from "../config/env";

const JWT_EXPIRY = env.JWT_EXPIRY || "7d";
const key = 'private.pem';
const privateKeyPath = path.resolve(process.cwd(), key);
const privateKey = fs.readFileSync(privateKeyPath, "utf8");

interface TokenPayload {
  id: string;
  email: string;
}

export const generateToken = (user: TokenPayload): string => {
  return jwt.sign(user, privateKey, {
    algorithm: "RS256",
    expiresIn: JWT_EXPIRY,
  });
};

export const verifyToken = (token: string): TokenPayload | null => {
  try {
    return jwt.verify(token, privateKey, {
      algorithms: ["RS256"],
    }) as TokenPayload;
  } catch (error) {
    return null;
  }
};
