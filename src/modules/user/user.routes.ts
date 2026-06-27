import { Router } from "express";
// import { authenticate } from "../middlewares/authenticate.middleware.js";
import { MediaController } from "../media/media.controller.js";
import { MediaRepository } from "../media/media.repository.js";
import { TMDBProvider } from "../../shared/providers/tmdb/tmdb.provider.js";
import { MediaService } from "../media/media.service.js";
import { FavoriteRepositoy } from "../favorite/favorite.repository.js";

const favoriteRepository = new FavoriteRepositoy()
const mediaRepository = new MediaRepository()
const mediaProvider = new TMDBProvider()
const mediaService = new MediaService(mediaRepository, mediaProvider, favoriteRepository)
const mediaController = new MediaController(mediaService);

const router = Router();
// router.get("/");


router.get("/favorites", mediaController.showFavorites);
// router.get("/rates", mediaController.showRates);
router.get("/reviews", mediaController.showReviews);

export default router;
