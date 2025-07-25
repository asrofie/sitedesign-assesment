import { ValidationChain } from "express-validator";
import {
  createEmailValidator,
  createPasswordValidator,
  createTextValidator,
} from "./common.validation";

export const userCreateValidator = (): ValidationChain[] => {
  return [
    createTextValidator("name", 100, true),
    createEmailValidator("email", true),
    createPasswordValidator("password", true),
  ];
};

export const userUpdateValidator = (): ValidationChain[] => {
  return [
    createTextValidator("name", 100, false),
    createEmailValidator("email", false),
    createPasswordValidator("password", false),
  ];
};
