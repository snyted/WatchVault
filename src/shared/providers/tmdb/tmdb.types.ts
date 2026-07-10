import { MediaType } from "@prisma/client";

export interface TMDBMediaResult {
    id: number,
    title?: string,
    name?: string,
    overview: string,
    release_date?: string | null,
    first_air_date?: string,
    poster_path: string | null,
    backdrop_path: string | null,
    media_type: MediaType;
}