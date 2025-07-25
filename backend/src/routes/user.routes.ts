import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { PageValidator } from "../validations/page.validation";
import { createUserController, deleteUserController, fetchUserPaginatedController, updateUserController } from "../controllers/user.controller";
import validateRequest from "../middlewares/validate.middleware";
import { userCreateValidator, userUpdateValidator } from "../validations/user.validation";
import { createIdValidator } from "../validations/common.validation";

const router = Router();

router.get("/me", authenticate, (req, res) => {
  res.json({ success: true, user: (req as any).user });
});
router.get(
  "/user",
  [...PageValidator(["name"]), authenticate],
  validateRequest,
  fetchUserPaginatedController,
);
router.post(
  "/user",
  [...userCreateValidator(), authenticate],
  validateRequest,
  createUserController,
);
router.put(
  "/user",
  [...userUpdateValidator(), authenticate],
  validateRequest,
  updateUserController,
);
router.post(
  "/user/delete-user",
  [createIdValidator("id", true), authenticate],
  validateRequest,
  deleteUserController,
);
export default router;
