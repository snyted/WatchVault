import tmdbApi from "../../config/tmdb.js";
import { ApiError } from "../../errors/api.error.js";
import { AppMedia } from "../../types/media.js";
import { mapTmdbData } from "./tmdb.mapper.js";
import { TMDBRawResult } from "./tmdb.types.js";

export class TMDBProvider {
    async getMediaById(id: string, type: string): Promise<AppMedia> {
        try {
            const { data } = await tmdbApi.get(`/${type}/${id}`);
            return mapTmdbData(data);
        } catch (error: any) {
            throw new ApiError(
                error.response?.status || 500,
                "Erro ao buscar filme ou série no TMDB"
            );
        }
    }

    async getTrending(type: string): Promise<AppMedia> {
        try {
            const { data } = await tmdbApi.get(`/trending/${type}/week`);
            return data.results.map((media: TMDBRawResult) => mapTmdbData(media));
        } catch (err: any) {
            console.error("Erro ao buscar dados do TMDB:", err.message);
            throw new ApiError(500, "Erro ao buscar tendências");
        }
    }

    async search(name: string): Promise<AppMedia> {
        try {
            const { data } = await tmdbApi.get("/search/multi", {
                params: { query: name },
            });
            return data.results.map((media: TMDBRawResult) => mapTmdbData(media));
        } catch (error: any) {
            throw new ApiError(
                error.response?.status || 500,
                "Erro ao buscar filmes por nome"
            );
        }
    }
}