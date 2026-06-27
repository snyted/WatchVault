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

export interface IMediaRepository {
    create(data: AppMedia): Promise<void>,
    find(id: number, type: MediaType): Promise<AppMedia>,
}

export interface MediaRequestQuery {
  type?: string;
  page?: string;
}