import { Router } from "express";
import { login } from "../controllers/auth.controller";
import validateRequest from "../middlewares/validate.middleware";
import { loginValidation } from "../validations/auth.validation";
import { initUserController } from "../controllers/user.controller";

const router = Router();

router.post("/login", loginValidation, validateRequest, login);
router.post("/init", initUserController);

export default router;
