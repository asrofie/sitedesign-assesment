import { Request, Response, NextFunction } from "express";
import { authenticateUser } from "../services/auth.service";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "email and password are required",
      });
      return;
    }

    const user = await authenticateUser(email, password);

    if (!user) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    res.json({ success: true, message: "Login successful", data: user });
  } catch (error) {
    next(error);
  }
};