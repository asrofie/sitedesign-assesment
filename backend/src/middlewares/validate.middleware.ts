import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

const validateRequest = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res
      .status(400)
      .json({ success: false, errors: errors.array().map((e) => e.msg) });
    return;
  }
  next();
};

export default validateRequest;
