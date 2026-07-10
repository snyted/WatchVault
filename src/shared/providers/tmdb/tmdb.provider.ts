import { MediaType } from "@prisma/client";
import { AppError } from "../../errors/app.error.js";
import {  MediaProviderResponse } from "../../../modules/media/media.types.js";
import { mapTMDB } from "./tmdb.mapper.js";
import { TMDBMediaResult } from "./tmdb.types.js";
import tmdbApi from "../../config/tmdb.js";

export class TMDBProvider {
    async getMediaById(tmdbId: number, type: MediaType): Promise<MediaProviderResponse> {
        try {
            const { data } = await tmdbApi.get(`/${type}/${tmdbId.toString()}`);
            console.log('MediaById: ', data)
            return mapTMDB(data, type);
        } catch (error: any) {
            this.handleAxiosError(error);
        }
    }

    async getTrending(type: MediaType): Promise<MediaProviderResponse[]> {
        try {
            const { data } = await tmdbApi.get(`/trending/${type}/week`);
            return data.results.map((m: TMDBMediaResult) => mapTMDB(m));
        } catch (error: any) {
            this.handleAxiosError(error);
        }
    }

    async search(name: string): Promise<MediaProviderResponse> {
        try {
            const { data } = await tmdbApi.get("/search/multi", {
                params: { query: name },
            });
            return data.results.map((media: TMDBMediaResult) => mapTMDB(media));
        } catch (error: any) {
            this.handleAxiosError(error);
        }
    }

    private handleAxiosError(error: any): never {
        const statusCode = error.response?.status || 500;

        let message = "Falha na comunicação com o provedor de mídias.";
        if (statusCode === 429) message = "Limite de requisições atingido. Tente novamente em breve.";
        if (statusCode === 404) message = "Mídia não encontrada no provedor externo.";

        throw new AppError(statusCode, message);
    }
}