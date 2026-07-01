import { Media, Prisma } from "@prisma/client";
import { AppMedia } from "./media.types.js";

export class MediaMapper {
    static toDomain(data: Media): AppMedia {
        return {
            tmdbId: data.tmdbId,
            title: data.title,
            overview: data.overview,
            releaseDate: (data.releaseDate?.toISOString()) || null,
            posterPath: data.posterPath || null,
            backdropPath: data.backdropPath || null,
            type: data.type,
        }
    }

    static toPrisma(data: AppMedia): Prisma.MediaCreateInput {
        return {
            tmdbId: data.tmdbId,
            title: data.title,
            overview: data.overview,
            type: data.type,
            releaseDate: data.releaseDate ? new Date(data.releaseDate) : null,
            posterPath: data.posterPath,
            backdropPath: data.backdropPath
        }
    }
}