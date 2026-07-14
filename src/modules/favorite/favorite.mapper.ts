import { AppFavorite } from "./favorite.types.js";
import { FavoriteWithMediaPrisma } from "./favorite.repository.js";
import { MediaMapper } from "../media/media.mapper.js";

export class FavoriteMapper {
    static toDomain(data: FavoriteWithMediaPrisma): AppFavorite {
        return {
            userId: data.userId,
            media: MediaMapper.toDomain(data.media),
            createdAt: data.createdAt
        }
    }
    static toResponse(data: AppFavorite) {
        return {
            id: data.media.id,
            tmdb_id: data.media.tmdbId,
            title: data.media.title,
            type: data.media.type,
            release_date: data.media.releaseDate,
            poster_path: data.media.posterPath,
            favorited_at: new Date(data.createdAt).toISOString()
        }
    }

}