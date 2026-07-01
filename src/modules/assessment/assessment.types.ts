export interface IAssesmentRepository {
    insertReview(data: Review): Promise<Review>;
    insertRating(data: Rating): Promise<Rating>;

    UpdateReview(userId: number, mediaId: number, newReview: string): Promise<Review>;

    deleteReview(userId: number, mediaId: number): Promise<void>;
    deleteRating(userId: number, mediaId: number): Promise<void>; 

    listReviews(userId: number): Promise<Review[]>;
    listRatings(userId: number): Promise<Rating[]>;
}

// Domain
export interface Review {
    userId: number,
    mediaId: number,
    review: string,
    rating: number,
}

export interface Rating {
    userId: number,
    mediaId: number,
    rating: number,
}

// Requests
export interface CreateReviewDTO {
    mediaId: number,
    review: string,
    rating: number,
}

export interface CreateRatingDTO {
    mediaId: number,
    rating: number,
}

// Response
export type ReviewResponse = Review

export type RatingResponse = Rating
