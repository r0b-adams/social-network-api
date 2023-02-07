import { Router } from "express";
import { apiRoutes } from "./api";

const router = Router();
router.use(apiRoutes);

export { router as routes };
