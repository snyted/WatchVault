import { ApiError } from "../../shared/errors/api.error.js";
import { AppFavorite, IFavoriteRepository, ToggleFavoriteDTO } from "./favorite.types.js";

export class FavoriteService {
    constructor(private readonly favoriteRepository: IFavoriteRepository) { }

    public async myFavs(userId: string): Promise<AppFavorite[]> {
        const favorites = await this.favoriteRepository.userList(Number(userId));

        if (!favorites) {
            throw new ApiError(404, "Usuário não favoritou nenhum filme/serie ainda!");
        }

        return favorites;
    }

    public async toggle(favorite: ToggleFavoriteDTO) {
        const isFavorited = await this.favoriteRepository.find(favorite.mediaId, favorite.mediaId);

        if (isFavorited) {
            await this.favoriteRepository.delete(favorite.userId, favorite.mediaId);
            return isFavorited;
        }

        const inserted = await this.favoriteRepository.insert(favorite.userId, favorite.mediaId);
        return inserted
    }
}