import { query } from "express-validator";

export const PageValidator = (sortColumns: string[] | null): any[] => {
  let validators: any[] = [
    query("page")
      .default(0)
      // .optional()
      .isInt({ min: 0 })
      .withMessage("Page must be a positive integer")
      .toInt(),
    query("limit")
      .default(10)
      // .optional()
      .isInt({ min: 1, max: 1000 })
      .withMessage("Length must be a positive integer between 1-1000")
      .toInt(),
    query("search")
      .optional({ checkFalsy: true })
      .isString()
      .withMessage("Search must be a string")
      .escape(),
  ];
  if (sortColumns) {
    validators.push(
      query("sort_by")
        .default(sortColumns[0])
        .trim()
        .isString()
        .withMessage("Sort by must be a string")
        .isIn(sortColumns)
        .escape()
        .withMessage("Sort by is not recognized"),
    );
    validators.push(
      query("sort")
        .default("asc")
        .trim()
        .isString()
        .withMessage("Sort must be a string")
        .isIn(["asc", "desc"])
        .escape()
        .withMessage("Sortis not recognized"),
    );
  }
  return validators;
};
