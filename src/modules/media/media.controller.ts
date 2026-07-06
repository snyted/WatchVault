import { Request, Response, NextFunction } from "express";
import {
  MediaService,
} from "./media.service.js";
import { AppError } from "../../shared/errors/app.error.js";
import { MediaType } from "@prisma/client";
import { AppMedia, MediaRequestQuery } from "./media.types.js";


export class MediaController {
  constructor(private readonly mediaService: MediaService) {
  }

  public trending = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const type: MediaType = this.getType(req);
      const mediaResponse = await this.mediaService.trending(type);
      res.json(mediaResponse);
    } catch (error) {
      next(error);
    }
  }

  public search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const q = req.query.q as string;
      if (!q) {
        res.status(400).json({ error: "Parâmetro 'q' é obrigatório" });
        return;
      }
      const medias = await this.mediaService.search(q);
      res.status(200).json(medias);
    } catch (error) {
      next(error);
    }
  }

  public findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string
      const type: MediaType = this.getType(req)

      const media: AppMedia = await this.mediaService.findOrCreate(Number(id), type);

      res.status(200).json(media);
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