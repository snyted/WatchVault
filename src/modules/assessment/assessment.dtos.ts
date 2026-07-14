import {  AppMediaType } from "../media/media.types.js";

export interface CreateAssessmentRequest {
    userId: number,
    mediaId: number,
    type: AppMediaType,
    review: string | null,
    rating: number,
}
export interface UpdateAssessmentRequest {
    userId: number,
    mediaId: number,
    type: AppMediaType,
    review: string,
    rating: number,
}
export interface DeleteAssessmentRequest {
    userId: number,
    mediaId: number,
    type: AppMediaType,
};

export interface UserAssessmentsResponse {
    mediaId: number,
    title: string,
    type: AppMediaType,
    review: string | null,
    rating: number,
}

export interface MediaAssessmentsResponse {
    id: number,
    user: string,
    review: string,
    rating: number
}