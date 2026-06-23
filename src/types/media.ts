import { MediaType } from "@prisma/client";

export interface AppMedia {
    tmdbId: string,
    title?: string,
    overview: string,
    releaseDate: string,
    posterPath: string | null,
    backdropPath: string | null,
    type: MediaType,
}