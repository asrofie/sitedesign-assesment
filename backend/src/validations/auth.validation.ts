import {
  createEmailValidator,
  createPasswordValidator,
} from "./common.validation";

export const loginValidation = [
  createEmailValidator("email", true),
  createPasswordValidator("password", true),
];
