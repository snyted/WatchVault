import { AppMedia } from "../media/media.types.js";
import { MediaType } from "@prisma/client";


// domain
export interface IFavoriteRepository {
    insert(userId: number, mediaId: number): Promise<void>,
    find(userId: number, mediaId: number): Promise<AppFavorite | null>,
    delete(userId: number, mediaId: number): Promise<void>,
    userList(userId: number): Promise<AppFavorite[] | null>,
};

export interface AppFavorite {
    userId: number,
    media: AppMedia,
};


// DTO
export interface ToggleFavoriteDTO {
    userId: number,
    mediaId: number,
    mediaType: MediaType,
};