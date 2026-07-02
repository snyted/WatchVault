import { MediaType } from "@prisma/client";

export interface IAssesmentRepository {
    insert(data: Review): Promise<void>,
    update(userId: number, mediaId: number, newReview: string): Promise<Review>,
    findById(userId: number, mediaId: number): Promise<boolean>
    delete(userId: number, mediaId: number): Promise<void>,
    userReviews(userId: number): Promise<Review[]>,
    mediaReviews(mediaId: number): Promise<Review[]>,
};

// Domain
export interface Review {
    userId: number,
    mediaId: number,
    review?: string | null,
    rating: number,
};

// Requests
export interface UpsertReviewDTO {
    userId: number,
    mediaId: number,
    review?: string,
    rating: number,
};

// Response
export type ReviewResponse = Review;
