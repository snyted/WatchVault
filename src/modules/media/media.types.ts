import { Media, MediaType } from "@prisma/client";
export interface AppMedia {
    tmdbId: number,
    title: string,
    overview: string,
    releaseDate: string | null,
    posterPath: string | null,
    backdropPath: string | null,
    type: MediaType,
}

export interface IMediaRepository {
    insert(data: AppMedia): Promise<AppMedia>,
    findById(tmdbId: number, type: MediaType): Promise<AppMedia | null>,
    searchByName(name: string): Promise<AppMedia[] | null>,
}

export interface MediaRequestQuery {
  type?: string;
  page?: string;
}

export type AppMediaType = MediaType


export interface UserMediaResponseDTO extends Omit<Media, "id" | "createAt" | "updatedAt"> {
  rate?: number | null;
  review?: string | null;
  favorited?: boolean;
}