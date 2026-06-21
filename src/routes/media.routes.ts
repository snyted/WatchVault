import { Router } from "express";
import { MediaController } from "../controllers/media.controller.js";
import { MediaService } from "../services/media.service.js";
import { MediaRepository } from "../repositories/media.repository.js";
import { TMDBProvider } from "../providers/tmdb/tmdb.provider.js";

export const router = Router();

const mediaRepository = new MediaRepository()
const mediaProvider = new TMDBProvider()
const mediaService = new MediaService(mediaRepository, mediaProvider)
const mediaController = new MediaController(mediaService);

router.get("/", mediaController.getTrending);
router.get("/search", mediaController.search)

router.get("/:id", mediaController.findMediaById);
// router.post("/:id/favorite", authenticate, toggleFavoriteController);
// router.put("/:id/rate", authenticate, putRate);
// router.put("/:id/review", authenticate, putReview);

export default router;
