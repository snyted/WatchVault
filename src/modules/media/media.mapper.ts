import { Media as MediaModel, Prisma } from "@prisma/client";
import { AppMedia, MediaProviderResponse } from "./media.types.js";

export class MediaMapper {
    static toDomain(data: MediaModel): AppMedia {
        return {
            id: data.id,
            tmdbId: data.tmdbId,
            title: data.title,
            overview: data.overview,
            type: data.type,
            releaseDate: (data.releaseDate?.toISOString()) || null,
            posterPath: data.posterPath || null,
            backdropPath: data.backdropPath || null,
            createdAt: data.createdAt.toISOString()
        }
    }

    static toPrisma(data: MediaProviderResponse): Prisma.MediaCreateInput {
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