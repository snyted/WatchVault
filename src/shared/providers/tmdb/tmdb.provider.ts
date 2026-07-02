import { MediaType } from "@prisma/client";
import { ApiError } from "../../errors/api.error.js";
import { AppMedia } from "../../../modules/media/media.types.js";
import { mapTMDB } from "./tmdb.mapper.js";
import { TMDBMediaResult } from "./tmdb.types.js";
import tmdbApi from "../../config/tmdb.js";

export class TMDBProvider {
    async getMediaById(tmdbId: number, type: MediaType): Promise<AppMedia> {
        try {
            const { data } = await tmdbApi.get(`/${type}/${tmdbId.toString()}`);
            return mapTMDB(data, type);
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
            return data.results.map((m: TMDBMediaResult) => mapTMDB(m));
        } catch (error: any) {
            throw new ApiError(500, "Erro ao buscar trendings do Provider.");
        }
    }

    async search(name: string): Promise<AppMedia> {
        try {
            const { data } = await tmdbApi.get("/search/multi", {
                params: { query: name },
            });
            return data.results.map((media: TMDBMediaResult) => mapTMDB(media));
        } catch (error: any) {
            throw new ApiError(
                error.response?.status || 500,
                "Erro ao buscar filmes por nome"
            );
        }
    }
}