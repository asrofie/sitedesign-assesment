import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";
export const authenticate = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      res
        .status(401)
        .json({ success: false, message: "Access denied. No token provided." });
      return;
    }

    const decoded = verifyToken(token);
    if (!decoded) {
      res.status(401).json({ success: false, message: "Invalid token." });
      return;
    }

    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
