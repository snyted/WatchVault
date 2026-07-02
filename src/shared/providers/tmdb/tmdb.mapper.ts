import { MediaType } from "@prisma/client";
import { AppMedia } from "../../../modules/media/media.types.js";
import { TMDBMediaResult } from "./tmdb.types.js";


export function mapTMDB(raw: TMDBMediaResult, type?: MediaType): AppMedia {
  return {
    tmdbId: raw.id,
    title: raw.title ?? raw.name ?? '',
    overview: raw.overview,
    releaseDate: raw.release_date || null,
    posterPath: raw.poster_path || null,
    backdropPath: raw.backdrop_path || null,
    type: type ?? raw.media_type,
  };
}