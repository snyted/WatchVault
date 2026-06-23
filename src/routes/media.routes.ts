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

router.get("/", mediaController.trending);
router.get("/search", mediaController.search)

router.get("/:id", mediaController.findById);
router.post("/:id/favorite", mediaController.toggleFavorite);
router.put("/:id/rate", mediaController.createRate);
router.put("/:id/review", mediaController.createReview);

export default router;
