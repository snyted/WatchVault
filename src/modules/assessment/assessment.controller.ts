import { NextFunction, Request, Response } from "express";
import { AssessmentService } from "./assessment.service.js";
import { UpsertReviewDTO } from "./assessment.types.js";
import { MediaRequestQuery } from "../media/media.types.js";
import { AppError } from "../../shared/errors/app.error.js";
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

    public myReviews = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.user;
            console.log(typeof id)
            const list = await this.assessmentService.userReviews(id);
            res.status(200).json(list);
        } catch (err) {
            next(err);
        }
    }

    public upsertReview = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.user;
            const dto: UpsertReviewDTO = req.body;


            const created = this.assessmentService.upsertReview(dto, id)
        } catch (error) {
            next(error)
        }
    }

    public allReviews = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { media_id: id } = req.body

            const reviews = await this.assessmentService.allReviews(id)

            res.status(200).json(reviews)
        } catch (error) {
            next(error)
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