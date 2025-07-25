import { body } from "express-validator";

export const createTextValidator = (
  key: string,
  length?: number | 100,
  required?: boolean | true,
): any => {
  let keyValidator = body(key).trim();
  if (required) {
    keyValidator = keyValidator.notEmpty().withMessage(key + " is required");
  } else {
    keyValidator = keyValidator.optional({ checkFalsy: true });
  }
  return keyValidator
    .isLength({ max: length })
    .withMessage(`${key} must be less than ${length} characters`)
    .matches(/^[a-zA-Z0-9 \-_\s,.]+$/)
    .withMessage(`${key} contains invalid characters`)
    .escape();
};

export const createEmailValidator = (
  key: string,
  required?: boolean | true,
): any => {
  let keyValidator = body(key).trim();
  if (required) {
    keyValidator = keyValidator.notEmpty().withMessage(key + " is required");
  } else {
    keyValidator = keyValidator.optional({ checkFalsy: true });
  }
  return keyValidator
    .isLength({ max: 100 })
    .withMessage(`${key} must be less than 100 characters`)
    .isEmail()
    .withMessage(`${key} must be a valid email`);
};

export const createIdValidator = (
  key: string,
  required?: boolean | true,
): any => {
  let keyValidator = body(key).trim();
  if (required) {
    keyValidator = keyValidator.notEmpty().withMessage(key + " is required");
  } else {
    keyValidator = keyValidator.optional({ checkFalsy: true });
  }
  return keyValidator
    .isString()
    .isLength({ min: 24, max: 24 })
    .withMessage(key + " must be an string")
    .escape();
};

export const createPasswordValidator = (
  key: string,
  required?: boolean,
): any => {
  let keyValidator = body(key);
  if (required) {
    keyValidator = keyValidator.notEmpty().withMessage(key + " is required");
  } else {
    keyValidator = keyValidator.optional({ checkFalsy: true });
  }
  return keyValidator
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long");
};
