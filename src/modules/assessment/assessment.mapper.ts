import { CreateAssessmentRequest, UserAssessmentsModelInput } from "./assessment.types.js";

// assessment.mapper.ts
export class AssessmentMapper {
    public static toPrisma(request: CreateAssessmentRequest, internalMediaId: number): UserAssessmentsModelInput {
        return {
            userId: request.userId,
            review: request.review,
            rating: request.rating,
            mediaId: internalMediaId,
        };
    }
}