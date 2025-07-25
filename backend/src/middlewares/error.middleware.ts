import { Request, Response, NextFunction } from "express";

interface AppError extends Error {
  status?: number;
}

const errorHandler = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(`[ERROR] ${err.message}`);

  const statusCode = err.status || 500;
  const response = {
    success: false,
    message: err.message || "Internal Server Error",
  };

  res.status(statusCode).json(response);
};

export default errorHandler;
