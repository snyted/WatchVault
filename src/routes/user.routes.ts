import { Router } from "express";
// import { authenticate } from "../middlewares/authenticate.middleware.js";
import { MediaController } from "../controllers/media.controller.js";
import { MediaRepository } from "../repositories/media.repository.js";
import { TMDBProvider } from "../providers/tmdb/tmdb.provider.js";
import { MediaService } from "../services/media.service.js";

const mediaRepository = new MediaRepository()
const mediaProvider = new TMDBProvider()
const mediaService = new MediaService(mediaRepository, mediaProvider)
const mediaController = new MediaController(mediaService);

const router = Router();
router.get("/");
router.get("/favorites", mediaController.showFavorites);
router.get("/rates", mediaController.showRates);
router.get("/reviews", mediaController.showReviews);

export default router;
