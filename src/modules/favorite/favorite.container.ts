import { FavoriteService } from "../favorite/favorite.service.js";
import { FavoriteRepositoryPrisma } from "../favorite/favorite.repository.js";
import { FavoriteController } from "./favorite.controller.js";
import { mediaService } from "../media/media.container.js";

const favoriteService = new FavoriteService(new FavoriteRepositoryPrisma, mediaService)
export const favoriteController = new FavoriteController(favoriteService)