import { MediaType } from "@prisma/client";

export interface TMDBRawResult {
    id: string;
    title?: string;
    name?: string;
    overview: string;
    release_date: string;
    poster_path: string | null;
    backdrop_path: string | null,
    media_type: MediaType;
}