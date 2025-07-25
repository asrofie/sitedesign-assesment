import { Request, Response, NextFunction } from "express";
import {
  createLog,
  sanitizeData,
  sentErrorLog,
  sentInfoLog,
} from "../utils/logger";
import { LogData } from "../dto/logger";

const EXCLUDED_API = ["/api/v1/api-docs"];

export const apiCallLogger = (
  req: Request,
  res: Response,
  next: NextFunction,
): any => {
  if (EXCLUDED_API.includes(req.path)) {
    return next();
  }
  const originalSend = res.send;
  const startTime = Date.now();
  res.send = function (body: any): Response {
    const responseTime = Date.now() - startTime;
    const isError = res.statusCode >= 400; // Detect 4xx/5xx errors
    try {
      const responseBody = typeof body === "string" ? JSON.parse(body) : body;
      const sanitizedResponse = responseBody.data
        ? sanitizeData(responseBody.data)
        : responseBody;
      let logData: LogData = createLog(req);
      logData.response_time = responseTime;
      logData.response = sanitizedResponse;
      const category = logData.category;
      delete logData.category;
      if (isError) {
        sentErrorLog(category, logData);
      } else {
        sentInfoLog(category, logData);
      }
    } catch (error) {
      sentErrorLog(null, error);
    }
    return originalSend.call(this, body);
  };
  next();
};
