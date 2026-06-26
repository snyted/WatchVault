import { AppFavorite } from "../../types/favorite.js";
import { FavoriteWithMediaPrisma } from "../favorite.repository.js";
import { MediaStorageMapper } from "./media-storage.mapper.js";

export class FavoriteStorageMapper {
    static toDomain(data: FavoriteWithMediaPrisma): AppFavorite {
        return {
            userId: data.userId,
            media: MediaStorageMapper.toDomain(data.media),
        }
    }
}