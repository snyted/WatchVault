import { Router } from "express";

import { userController } from "./user.container.js";
import { favoriteController } from "../favorite/favorite.container.js";
import { assessmentController } from "../assessment/assessment.container.js";

import { authenticate } from "../../shared/middlewares/authenticate.middleware.js";

const router = Router();
router.get("/", authenticate, userController.userStats);
router.get("/assessments", authenticate, assessmentController.userAssessments);
router.get("/favorites", authenticate, favoriteController.userFavorites);

export default router;
