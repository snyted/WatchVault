import { Assessment as AssessmentModel, MediaType } from "@prisma/client";

export interface IAssessmentRepository {
    insert(data: UserAssessmentsModelInput): Promise<void>,
    update(userId: number, mediaId: number, newAssessment: string): Promise<void>,
    delete(userId: number, mediaId: number): Promise<void>,
    findById(userId: number, mediaId: number): Promise<AssessmentModel | null>
    userAssessments(userId: number): Promise<UserAssessmentsModel[]>,
    mediaAssessments(mediaId: number, type: MediaType): Promise<any>,
};

// Domain
export interface Assessment {
    userId: number,
    mediaId: number,
    type: MediaType,
    review: string | null,
    rating: number,
};

// Requests
export interface CreateAssessmentRequest {
    userId: number,
    mediaId: number,
    type: MediaType,
    review: string | null,
    rating: number,
}
export interface UpdateAssessmentRequest {
    userId: number,
    mediaId: number,
    type: MediaType,
    review: string,
    rating: number,
}
export interface DeleteAssessmentRequest {
    userId: number,
    mediaId: number,
    type: MediaType,
};

export interface UserAssessmentsResponse {
    mediaId: number,
    title: string,
    type: MediaType,
    review: string | null,
    rating: number,
}

// Repository 
export interface UserAssessmentsModelInput {
    userId: number,
    mediaId: number,
    review: string | null,
    rating: number,
}
export interface UserAssessmentsModel {
    mediaId: number,
    media: {
        title: string,
        type: MediaType
    },
    review: string | null,
    rating: number,
}

export interface MediaAssessmentsModel {
    media: { title: string },
    assessments: {
        id: number,
        review: string | null,
        rating: number,
    }
}