export interface TMDBRawResult {
    id: string;
    title?: string;
    name?: string;
    overview: string | null;
    releaseDate?: string;
    poster_path?: string | null;
    backdrop_path?: string | null,
    media_type: string;
}