
import { TMDBProvider } from "../../shared/providers/tmdb/tmdb.provider.js";
import { AppMedia, AppMediaType, IMediaRepository } from "./media.types.js";


export class MediaService {
    public constructor(private readonly mediaRepository: IMediaRepository, private readonly mediaProvider: TMDBProvider) { }

    public trending(type: AppMediaType): Promise<AppMedia[]> {
        return this.mediaProvider.getTrending(type)
    }

    public async search(query: string): Promise<any> {
        return await this.mediaProvider.search(query)
    }

    public async find(id: string, type: AppMediaType): Promise<AppMedia> {
        const domainMedia = await this.mediaRepository.findById(Number(id), type);
        if (domainMedia) return domainMedia;

        const dataProvider = await this.mediaProvider.getMediaById(id, type);

        return await this.mediaRepository.insert(dataProvider);
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
