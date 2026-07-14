import { Media, MediaType, Prisma } from "@prisma/client";

// interface
export interface IMediaRepository {
    insert(data: Prisma.MediaCreateInput): Promise<AppMedia>,
    findById(tmdbId: number, type: MediaType): Promise<AppMedia | null>,
}

// domain
export interface AppMedia {
    id: number,
    tmdbId: number,
    title: string,
    overview: string,
    releaseDate: string | null,
    posterPath: string | null,
    backdropPath: string | null,
    type: MediaType,
    createdAt: string
}
export type AppMediaType = MediaType

// dtos
export interface UserMediaResponseDTO extends Omit<Media, "id" | "createAt" | "updatedAt"> {
    rate?: number | null;
    review?: string | null;
    favorited?: boolean;
}
export interface MediaRequestQuery {
    type?: string;
    page?: string;
}

export interface MediaProviderResponse {
    tmdbId: number,
    title: string,
    overview: string,
    releaseDate: string | null,
    posterPath: string | null,
    backdropPath: string | null,
    type: MediaType,
    length?: number,
}