import { Router } from "express";

import { mediaController } from "./media.container.js"
import { assessmentController } from "../assessment/assessment.container.js";
import { authenticate } from "../../shared/middlewares/authenticate.middleware.js";
import { favoriteController } from "../favorite/favorite.container.js";

const router = Router();

// main-resources
router.get("/", mediaController.trending);
router.get("/search", mediaController.search);
router.get("/:id", mediaController.findById);

// sub-resources
router.get("/:id/assessments", assessmentController.mediaAssessments);
router.post("/:id/assessments", authenticate, assessmentController.create);
router.patch("/:id/assessments", authenticate, assessmentController.update);
router.delete("/:id/assessments", authenticate, assessmentController.delete);

// router.get("/:id/favorites", favoriteController.getAll);
router.post("/:id/favorites", authenticate, favoriteController.add);
router.delete("/:id/favorites", authenticate, favoriteController.remove);

export default router;
