import { Router } from "express";
import { MediaController } from "./media.controller.js";
import { MediaService } from "./media.service.js";
import { MediaRepository } from "./media.repository.js";
import { TMDBProvider } from "../../shared/providers/tmdb/tmdb.provider.js";
import { FavoriteRepositoy } from "../favorite/favorite.repository.js";

export const router = Router();
const favoriteRepository = new FavoriteRepositoy
const mediaRepository = new MediaRepository()
const mediaProvider = new TMDBProvider()
const mediaService = new MediaService(mediaRepository, mediaProvider, favoriteRepository)
const mediaController = new MediaController(mediaService);

router.get("/", mediaController.trending);
router.get("/search", mediaController.search)
router.get("/:id", mediaController.findById);

// Media-User Interactions
router.post("/:id/favorite", mediaController.toggleFavorite);
router.put("/:id/rate", mediaController.createRate);
router.put("/:id/review", mediaController.createReview);

export default router;
