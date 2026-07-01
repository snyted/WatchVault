import { FavoriteService } from "../favorite/favore.service.js";
import { FavoriteRepositoryPrisma } from "../favorite/favorite.repository.js";
import { FavoriteController } from "./favorite.controller.js";

export const favoriteController = new FavoriteController(new FavoriteService(new FavoriteRepositoryPrisma))