import { Request } from "express";
import { LogData } from "../dto/logger";
import env from "../config/env";

const SENSITIVE_FIELDS = [
  "password",
  "newPassword",
  "confirmPassword",
  "token",
  "apiKey",
  "accessToken",
];

export const sanitizeData = (data: any): any => {
  if (!data || typeof data !== "object") return data;

  // Create a shallow copy to avoid modifying the original object
  const sanitized = { ...data };

  // Remove or mask sensitive fields
  SENSITIVE_FIELDS.forEach((field) => {
    if (sanitized[field]) {
      sanitized[field] = "******"; // Obfuscate value
      // OR completely remove it:
      // delete sanitized[field];
    }
  });

  return sanitized;
};

export const createLog = (req: Request): LogData => {
  const fullPath = req.originalUrl || req.path;
  const pathParts = fullPath.split("/");
  const module = pathParts.length >= 4 ? pathParts[3] : "unknown";
  const subModule = pathParts.length >= 4 ? pathParts[4] : null;
  let category: string = module;
  if (subModule) {
    category = `${category}-${subModule}`;
  }
  const responseBody =
    typeof req.body === "string" ? JSON.parse(req.body) : req.body;
  const sanitizedBody = responseBody.data
    ? sanitizeData(responseBody.data)
    : sanitizeData(responseBody);
  return {
    category: category,
    module,
    path: fullPath,
    query: req.query,
    body: sanitizedBody,
    method: req.method,
    timestamp: new Date().toISOString(),
  };
};

export const sentLog = (
  category?: string | null,
  payload?: any | null,
  type?: string,
): void => {
  const template = {
    category: category ? category : `${process.env.NODE_ENV}-${type}`,
    env: env.NODE_ENV,
    timestamp: new Date().toISOString(),
    type,
  };
  const data = payload ? Object.assign({}, template, payload) : template;
  if (type == "info") {
    console.log(data);
  } else {
    console.error(data);
  }
};

export const sentErrorLog = (
  category?: string | null,
  payload?: any | null,
): void => {
  let errorObject = payload;
  if (payload instanceof Error) {
    errorObject = { message: payload.message };
  }
  return sentLog(category, errorObject, "error");
};
export const sentInfoLog = (category?: string, payload?: any): void => {
  return sentLog(category, payload, "info");
};
