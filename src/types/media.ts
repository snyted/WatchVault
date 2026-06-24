import { MediaType } from "@prisma/client";

export interface AppMedia {
    tmdbId: number,
    title: string,
    overview: string,
    releaseDate: string | null,
    posterPath: string | null,
    backdropPath: string | null,
    type: MediaType,
}