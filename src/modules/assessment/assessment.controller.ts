import { NextFunction, Request, Response } from "express";
import { AssessmentService } from "./assessment.service.js";
import { UpsertReviewDTO } from "./assessment.types.js";
import { MediaRequestQuery } from "../media/media.types.js";
import { ApiError } from "../../shared/errors/api.error.js";
import { MediaType } from "@prisma/client";

export class AssessmentController {
    public constructor(private readonly assessmentService: AssessmentService) { };

    public upsert = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const review: UpsertReviewDTO = {
                userId: Number(req.body.id as string),
                mediaId: Number(req.params.id),
                review: req.body.review,
                rating: Number(req.body.rate),
            }


            await this.assessmentService.upsert(review);
            res.json({ message: "Nota adicionada com sucesso." });
        } catch (error) {
            next(error);
        }
    }

    myReviews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { userId } = req.body;
            const list = await this.assessmentService.userReviews(userId);
            res.status(200).json(list);
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