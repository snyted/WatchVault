import { Media, Prisma } from "@prisma/client";
import { AppMedia } from "./media.types.js";

export class MediaMapper {
    static toDomain(data: Media): AppMedia {
        return {
            id: data.id,
            tmdbId: data.tmdbId,
            title: data.title,
            overview: data.overview,
            type: data.type,
            releaseDate: (data.releaseDate?.toLocaleDateString("pt-br")),
            posterPath: data.posterPath || null,
            backdropPath: data.backdropPath || null,
        }
    }

    static toPrisma(data: AppMedia): Prisma.MediaCreateInput {
        return {
            tmdbId: data.tmdbId,
            title: data.title,
            overview: data.overview,
            type: data.type,
            releaseDate: new Date(data.releaseDate),
            posterPath: data.posterPath,
            backdropPath: data.backdropPath
        }
    }
}