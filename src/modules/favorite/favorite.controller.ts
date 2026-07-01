import { NextFunction, Request, Response } from "express";
import { FavoriteService } from "./favore.service.js";
import { ToggleFavoriteDTO } from "./favorite.types.js";
import { MediaRequestQuery } from "../media/media.types.js";
import { ApiError } from "../../shared/errors/api.error.js";
import { MediaType } from "@prisma/client";

export class FavoriteController {
    public constructor(private readonly favoriteService: FavoriteService) { }

    // user actions
    public myFavs = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.body;
            const favs = await this.favoriteService.myFavs(id);
            res.status(200).json({
                msg: "Aqui está sua lista",
                favs
            });
        } catch (err) {
            next(err);
        }
    }
    public toggleFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const favoriteDTO: ToggleFavoriteDTO = {
                userId: Number(req.body.id as string),
                mediaId: Number(req.params.id as string),
                mediaType: this.getType(req),
            }

            if (!favoriteDTO.mediaId || !favoriteDTO.mediaType) {
                throw new ApiError(400, "Verifique os campos do body.");
            }

            const result = await this.favoriteService.toggle(favoriteDTO);
            res.status(201).json({ result });
        } catch (err) {
            next(err);
        }
    }




    private getType = (req: Request) => {

        const { type } = req.query as MediaRequestQuery

        if (type !== 'movie' && type !== 'tv') {
            throw new ApiError(400, "Tipo inválido. Tente 'movie' ou 'tv'")
        }
        return type as MediaType
    }
}