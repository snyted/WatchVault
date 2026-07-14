import { CreateAssessmentRequest } from "./assessment.dtos.js";
import { UserAssessmentsModelInput } from "./assessment.types.js";

// assessment.mapper.ts
export class UserAssessmentMapper {
    public static toPrisma(request: CreateAssessmentRequest, internalMediaId: number): UserAssessmentsModelInput {
        return {
            userId: request.userId,
            review: request.review,
            rating: request.rating,
            mediaId: internalMediaId,
        };
    }
}

// export class MediaAssessmentMapper {
//     public static toResponse(datafromPrisma) {
//         return {
//             user: datafromPrisma.user.username,
//             review: datafromPrisma.review,
//             rating: datafromPrisma.rating
//         }
//     }
// }