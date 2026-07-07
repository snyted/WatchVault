import { mediaService } from "../media/media.container.js";
import { AssessmentController } from "./assessment.controller.js";
import { AssessmentRepositoryPrisma } from "./assessment.repository.js";
import { AssessmentService } from "./assessment.service.js";

const assessmentService = new AssessmentService(new AssessmentRepositoryPrisma, mediaService)
export const assessmentController = new AssessmentController(assessmentService);