import { NextFunction, Request, Response } from "express";
import { FavoriteService } from "./favorite.service.js";
import { ToggleFavoriteDTO } from "./favorite.types.js";
import { MediaRequestQuery } from "../media/media.types.js";
import { AppError } from "../../shared/errors/app.error.js";
import { MediaType } from "@prisma/client";

export class FavoriteController {
    public constructor(private readonly favoriteService: FavoriteService) { }

    public userFavorites = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.user;

            const favs = await this.favoriteService.userFavorites(id);

            res.status(200).json({
                data: {
                    favs
                }
            });
        } catch (error) {
            next(error);
        }
    }

    public add = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const favoriteDTO: ToggleFavoriteDTO = {
                userId: req.user.id,
                mediaId: Number(req.params.id),
                mediaType: this.getType(req),
            }

            if (!favoriteDTO.mediaId || !favoriteDTO.mediaType) {
                throw new AppError(400, "Verifique os campos do param.");
            }

            const result = await this.favoriteService.add(favoriteDTO);
            res.status(201).json({ data: { result } });
        } catch (error) {
            next(error);
        }
    }

    public remove = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const favoriteDTO: ToggleFavoriteDTO = {
                userId: req.user.id,
                mediaId: Number(req.params.id),
                mediaType: this.getType(req),
            }

            if (!favoriteDTO.mediaId || !favoriteDTO.mediaType) {
                throw new AppError(400, "Verifique os campos do param.");
            }

            const result = await this.favoriteService.remove(favoriteDTO);
            res.status(200).json({ data: { result } });
        } catch (error) {
            next(error);
        }
    }

    private getType = (req: Request) => {

        const { type } = req.query as MediaRequestQuery

        if (type !== 'movie' && type !== 'tv') {
            throw new AppError(400, "Tipo inválido. Tente 'movie' ou 'tv'")
        }
        return type as MediaType
    }
}