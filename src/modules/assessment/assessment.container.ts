import { AssessmentController } from "./assessment.controller.js";
import { AssessmentRepositoryPrisma } from "./assessment.repository.js";
import { AssessmentService } from "./assessment.service.js";

export const assessmentController = new AssessmentController(new AssessmentService(new AssessmentRepositoryPrisma));