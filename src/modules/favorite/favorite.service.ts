import { AppError } from "../../shared/errors/app.error.js";
import { MediaService } from "../media/media.service.js";
import { AppFavorite, IFavoriteRepository, ToggleFavoriteDTO } from "./favorite.types.js";

export class FavoriteService {
    constructor(private readonly favoriteRepository: IFavoriteRepository, private readonly mediaService: MediaService) { }
    
    public async add(dto: ToggleFavoriteDTO): Promise<{ favorite: true, title: string }> {
        const { id: internalId, title } = await this.mediaService.findOrCreate(dto.mediaId, dto.mediaType);

        const isFavorited = await this.favoriteRepository.find(dto.userId, internalId);
        if (isFavorited) {
            throw new AppError(409, "Filme ou Série já favoritado.");
        }

        await this.favoriteRepository.insert(dto.userId, internalId);
        return { title, favorite: true };
    }

    public async remove(dto: ToggleFavoriteDTO): Promise<{ favorite: false, title: string }> {
        const { id: internalId, title } = await this.mediaService.findOrCreate(dto.mediaId, dto.mediaType);

        const isFavorited = await this.favoriteRepository.find(dto.userId, internalId);

        if (!isFavorited) {
            throw new AppError(400, "Filme/Serie não favoritado. Verifique se a ação 'desfavorizar' já foi concluída.");
        }

        await this.favoriteRepository.delete(dto.userId, internalId);
        return { title, favorite: false };
    }

    public async userFavorites(userId: number): Promise<AppFavorite[]> {
        const favorites = await this.favoriteRepository.userList(userId);

        if (favorites.length === 0) {
            throw new AppError(404, "Usuário não favoritou nenhum filme/serie ainda!");
        }

        return favorites;
    }
}