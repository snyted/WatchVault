import { Request, Response, NextFunction } from "express";
import {
  MediaService,
} from "../services/media.service.js";
import { ApiError } from "../errors/api.error.js";

import { validateMedia } from "../utils/validators.js";
import { Media, MediaType } from "@prisma/client";
import { UpdateRateDTO } from "../dtos/media/update-rate.dto.js";
import { ToggleFavoriteDTO } from "../dtos/media/toggle-favorite.dto.js";
import { UpdateReviewDTO } from "../dtos/media/update-review.dto.js";

export interface MediaRequestQuery {
  type?: string;
  page?: string;
}

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

  findById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id as string
      const type: MediaType = this.getType(req)
      const media: Media = await this.mediaService.find(id, type);
      validateMedia(media);
      res.status(200).json(media);
    } catch (error) {
      next(error);
    }
  }

  search = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
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

  public toggleFavorite = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const favoriteDTO: ToggleFavoriteDTO = {
        mediaId: Number(req.params.id as string),
        userId: Number(req.body.id as string),
        mediaType: this.getType(req),
      }

      if (!favoriteDTO.mediaId || !favoriteDTO.mediaType) {
        throw new ApiError(400, "ID ou tipo não informados.");
      }

      const result = await this.mediaService.toggleFavorite(favoriteDTO);
      res.status(result.favorited ? 201 : 200).json({
        message: result.favorited ?
          `${result.media} favoritado com sucesso!`
          :
          `${result.media} removido dos favoritos`,
        ...result,
      });
    } catch (err) {
      next(err);
    }
  }

  public createRate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const rateDTO: UpdateRateDTO = {
        userId: Number(req.body.id as string),
        mediaId: Number(req.params.id),
        mediaType: this.getType(req),
        rate: Number(req.body.rate)
      }


      if (!rateDTO.rate) {
        throw new ApiError(400, 'Nota não fornecida ou inválida.')
      }

      await this.mediaService.upsertRate(rateDTO);
      res.json({ message: "Nota adicionada com sucesso." });
    } catch (error) {
      next(error);
    }
  }


  public createReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const reviewDTO: UpdateReviewDTO = {
        mediaId: Number(req.params.id),
        userId: Number(req.body.id),
        content: req.body.content,
        mediaType: this.getType(req),
      }

      if (!reviewDTO.content) {
        throw new ApiError(204, "Review não fornecida. Verifique o formato.")
      }

      const { message, data } = await this.mediaService.upsertReview(reviewDTO);

      res.json({ message, data });
    } catch (err) {
      next(err);
    }
  }

  showFavorites = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.body;
    try {
      const result = await this.mediaService.showFavorites(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  showRates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.body;

    try {
      const result = await this.mediaService.showRates(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  showReviews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.body;

    try {
      const result = await this.mediaService.showReviews(id);
      res.json(result);
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