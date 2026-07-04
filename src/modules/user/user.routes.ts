import { Router } from "express";
import { userController } from "./user.container.js";
import { favoriteController } from "../favorite/favorite.container.js";
import { authenticate } from "../../shared/middlewares/authenticate.middleware.js";

const router = Router();
router.get("/", authenticate ,userController.myInfos);

// router.get("/rates", favoriteController.myRatings);
// router.get("/reviews", favoriteController.myReviews);

router.get("/favorites", favoriteController.myFavs);
router.put("favorites/:id/toggle", favoriteController.toggleFavorite)

export default router;
