import { Router } from "express";

import { userController } from "./user.container.js";
import { favoriteController } from "../favorite/favorite.container.js";
import { assessmentController } from "../assessment/assessment.container.js";

import { authenticate } from "../../shared/middlewares/authenticate.middleware.js";

const router = Router();
router.get("/", authenticate, userController.myInfos);

router.get("/reviews", authenticate, assessmentController.myReviews);

router.get("/favorites", authenticate, favoriteController.myFavs);
router.put("favorites/:id/toggle", authenticate, favoriteController.toggleFavorite)

export default router;
