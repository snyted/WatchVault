import { MediaType, Assessment as AssessmentModel } from "@prisma/client";

export interface IAssessmentRepository {
    insert(data: Assessment): Promise<void>,
    update(userId: number, mediaId: number, newAssessment: string): Promise<void>,
    delete(userId: number, mediaId: number): Promise<void>,
    findById(userId: number, mediaId: number): Promise<AssessmentModel | null>
    userAssessments(userId: number): Promise<any[]>,
    mediaAssessments(mediaId: number, type: MediaType): Promise<any[]>,
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

