import { MediaType } from "@prisma/client";

export interface UpdateReviewDTO {
    mediaId: number,
    userId: number,
    content: string,
    mediaType: MediaType,
}