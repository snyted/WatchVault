import { MediaType } from "@prisma/client";

export interface ToggleFavoriteDTO {
    mediaId: number,
    userId: number,
    mediaType: MediaType,
}