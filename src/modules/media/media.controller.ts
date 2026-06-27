import { Request, Response, NextFunction } from "express";
import {
  MediaService,
} from "./media.service.js";
import { ApiError } from "../../shared/errors/api.error.js";
import { MediaType } from "@prisma/client";
import { UpdateRateDTO } from "../rating/update-rate.dto.js";
import { ToggleFavoriteDTO } from "../favorite/toggle-favorite.dto.js";
import { UpdateReviewDTO } from "../review/update-review.dto.js";
import { AppMedia, MediaRequestQuery } from "./media.types.js";


export class MediaController {
  constructor(private readonly mediaService: MediaService) {
  }


  //  ==== Media Context ====
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
      const media: AppMedia = await this.mediaService.find(id, type);

      if (!media) throw new ApiError(404, "Filme/Série não encontrados!");
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


  // ==== User-Media Interactions ====
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

      const upserted = await this.mediaService.upsertReview(reviewDTO);

      res.json({ upserted });
    } catch (err) {
      next(err);
    }
  }


  // User Context
  // public showRates = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  //   const id = req.body.id as number;

  //   try {
  //     const result = await this.mediaService.rates(id);
  //     res.json(result);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  public showFavorites = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { id } = req.body;
    try {
      const result = await this.mediaService.favorites(id);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  showReviews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = req.body;
      const result = await this.mediaService.reviews(id);
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