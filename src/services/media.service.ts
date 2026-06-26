
import { ApiError } from "../errors/api.error.js"
import {
    MediaRepository,
} from "../repositories/media.repository.js";
import { TMDBProvider } from "../providers/tmdb/tmdb.provider.js";
import { MediaType } from "@prisma/client";
import { AppMedia } from "../types/media.js";
import { UpdateReviewDTO } from "../dtos/media/update-review.dto.js";
import { ToggleFavoriteDTO } from "../dtos/media/toggle-favorite.dto.js";
import { UpdateRateDTO } from "../dtos/media/update-rate.dto.js";
import { FavoriteRepositoy } from "../repositories/favorite.repository.js";


export class MediaService {
    constructor(private readonly mediaRepository: MediaRepository, private readonly mediaProvider: TMDBProvider,
        private readonly favoriteRepository: FavoriteRepositoy) { }

    public trending(type: MediaType): Promise<AppMedia[]> {
        return this.mediaProvider.getTrending(type)
    }

    public async find(id: string, type: MediaType): Promise<AppMedia> {
        const domainMedia = await this.mediaRepository.find(Number(id), type);
        if (domainMedia) return domainMedia;

        const dataProvider = await this.mediaProvider.getMediaById(id, type);

        return await this.mediaRepository.create(dataProvider);

    }

    public async search(query: string): Promise<any> {
        return await this.mediaProvider.search(query)
    }

    public async rates(userId: number) {
        const rates = await this.mediaRepository.findRates(userId);

        if (!rates.length) {
            throw new ApiError(404, "Usuário ainda não adicionou nenhuma nota.");
        }

        return rates;
    }


    public async favorites(userId: string): Promise<any> {
        const favorites = await this.favoriteRepository.show(Number(userId));

        if (!favorites) {
            throw new ApiError(404, "Usuário não favoritou nenhum filme/serie ainda!");
        }

        return favorites;
    }

    public async toggleFavorite(favorite: ToggleFavoriteDTO) {
        const media = await this.mediaRepository.find(favorite.mediaId, favorite.mediaType);

        const existing = await this.favoriteRepository.find(favorite.userId, favorite.mediaId);

        if (existing) {
            await this.favoriteRepository.delete(favorite.userId, favorite.mediaId);
            return { favorited: false, media };
        }

        const inserted = await this.favoriteRepository.insert(favorite.userId, favorite.mediaId);
        return { favorited: true, favorite: inserted, media };
    }

    public async reviews(id: string) {

    }

    public async upsertReview(review: UpdateReviewDTO) {

    }

    public async upsertRate(rate: UpdateRateDTO) {

    }
}


// export async function getAllReviews(userId) {
//     const reviews = await findAllUserReviews(userId);

//     if (!reviews.length) {
//         throw new ApiError(404, "Usuário ainda não adicionou nenhuma review.");
//     }
//     const formated = reviews.map((rawFromPg) => mapPgData(rawFromPg));

//     return formated;
// }

// export async function updateOrAddRate(userId, mediaId, type, rating) {
//     const mediaIdNum = Number(mediaId);
//     const media = await findOrCreateMedia(mediaIdNum, type);
//     console.log(rating);
//     if (!media) {
//         throw new ApiError(401, "Filme/Serie não encontrado.");
//     }

//     const isRated = await findRateById(userId, media.id);

//     if (!isRated) {
//         const rateInserted = await insertRate(userId, media.id, rating);
//         return rateInserted;
//     }

//     const updRate = await updateRate(userId, media.id, rating);

//     return updRate;
// }

// export async function updateOrAddReview(userId, mediaId, type, content) {
//     const mediaIdNum = Number(mediaId);
//     const media = await findOrCreateMedia(mediaIdNum, type);
//     if (!media) {
//         throw new ApiError(401, "Filme/Serie não encontrado.");
//     }

//     const isRated = await findRateById(userId, media.id)

//     if (!isRated) {
//         throw new ApiError(400, 'É necessário adicionar uma nota primeiro.')
//     }

//     const isReviewed = await findReviewById(userId, media.id);

//     if (!isReviewed) {
//         const contentInserted = await insertContent(userId, media.id, content);
//         return { message: "Review criada!", data: contentInserted };
//     }

//     const updRate = await updateContent(userId, media.id, content);

//     return { message: "Review atualizada", data: updRate };
// }
