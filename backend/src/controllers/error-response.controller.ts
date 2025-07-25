import { Response } from "express";

const ErrorResponse = (error: Error, res: Response): any => {
  let message: string | null = null;
  let responseCode: number = 500;
  if (error instanceof Error) {
    message = error.message;
    responseCode = 400;
  } else {
    message = "Unknown error occurred";
    responseCode = 500;
  }
  return res.status(responseCode).json({ success: false, data: null, message });
};

export default ErrorResponse;
