import { MediaType } from "@prisma/client";
import { ApiError } from "../../errors/api.error.js";
import { AppMedia } from "../../types/media.js";
import { mapTmdbData } from "./tmdb.mapper.js";
import { TMDBRawResult } from "./tmdb.types.js";
import tmdbApi from "../../config/tmdb.js";

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

    async getTrending(type: MediaType): Promise<AppMedia[]> {
        try {
            const { data } = await tmdbApi.get(`/trending/${type}/week`);
            return data.results.map((m: TMDBRawResult) => mapTmdbData(m));
        } catch (error: any) {
            throw new ApiError(500, "Erro ao buscar trendings do Provider.");
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