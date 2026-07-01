import { AppFavorite } from "./favorite.types.js";
import { FavoriteWithMediaPrisma } from "./favorite.repository.js";
import { MediaMapper } from "../media/media.mapper.js";

export class FavoriteMapper {
    static toDomain(data: FavoriteWithMediaPrisma): AppFavorite {
        return {
            userId: data.userId,
            media: MediaMapper.toDomain(data.media),
        }
    }
}