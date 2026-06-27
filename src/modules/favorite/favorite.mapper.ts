import { AppFavorite } from "./favorite.types.js";
import { FavoriteWithMediaPrisma } from "./favorite.repository.js";
import { MediaStorageMapper } from "../media/media.mapper.js";

export class FavoriteMapper {
    static toDomain(data: FavoriteWithMediaPrisma): AppFavorite {
        return {
            userId: data.userId,
            media: MediaStorageMapper.toDomain(data.media),
        }
    }
}