import { Router } from "express";

import { mediaController } from "./media.container.js"
import { assessmentController } from "../assessment/assessment.container.js";
import { authenticate } from "../../shared/middlewares/authenticate.middleware.js";

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

export default router;
