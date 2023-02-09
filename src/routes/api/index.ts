import { Router } from "express";
import { userRoutes } from "./user";
import { thoughtRoutes } from "./thought";

const router = Router();
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

export { router as apiRoutes };
