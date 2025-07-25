import { body } from "express-validator";

export const IdValidator = body("id")
  .trim()
  .notEmpty()
  .withMessage("ID is required")
  .isInt()
  .withMessage("ID must be an integer")
  .toInt();

export const OrgIdValidator = body("org_id")
  .trim()
  .notEmpty()
  .withMessage("Org ID is required")
  .isInt()
  .withMessage("Org ID must be an integer")
  .toInt();

export const SlugValidator = body("slug")
  .trim()
  .notEmpty()
  .withMessage("Slug is required")
  .isString()
  .withMessage("Slug must be an string")
  .escape();

export const CustomIdValidator = (key: string, required: boolean): any => {
  let keyValidator = body(key).trim();
  if (required) {
    keyValidator = keyValidator.notEmpty().withMessage(key + " is required");
  } else {
    keyValidator = keyValidator.optional({ checkFalsy: true });
  }
  return keyValidator
    .isInt()
    .withMessage(key + " must be an integer")
    .toInt();
};
