import { Router } from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";

const router = Router();
// Register all routes here
router.use("/auth", authRoutes);
router.use("/admin", userRoutes);

export default router;
