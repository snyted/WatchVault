import { AppMedia } from "../../types/media.js";
import { TMDBRawResult } from "./tmdb.types.js";


export function mapTmdbData(raw: TMDBRawResult): AppMedia {
  return {
    tmdbId: raw.id,
    title: raw.title || raw.name,
    overview: raw.overview,
    releaseDate: raw.release_date,
    posterPath: raw.poster_path || null,
    backdropPath: raw.backdrop_path,
    type: raw.media_type,
  };
}