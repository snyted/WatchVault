import { Router } from "express";
import { mediaController } from "./media.container.js"

const router = Router();

// main-resources
router.get("/", mediaController.trending);
router.get("/search", mediaController.search);
router.get("/:id", mediaController.findById);


// sub-resources
// router.get("/:id/reviews", assessmentController.list);


export default router;
