import { MediaType } from "@prisma/client";

export interface IAssesmentRepository {
    insert(data: Assessment): Promise<void>,
    update(userId: number, mediaId: number, newAssessment: string): Promise<Assessment>,
    delete(userId: number, mediaId: number): Promise<void>,
    findById(userId: number, mediaId: number): Promise<any>
    userAssessments(userId: number): Promise<Assessment[]>,
    mediaAssessments(mediaId: number, type: MediaType): Promise<Assessment[]>,
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
export type CreateAssessmentRequest = Assessment;
export interface UpdateAssessmentRequest {
    userId: number,
    mediaId: number,
    type: MediaType,
    newReview: string,
    newRating: number,
}
export interface DeleteAssessmentRequest {
    userId: number,
    mediaId: number,
    type: MediaType,
};

// Requests


// Response
