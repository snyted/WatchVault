import { NextFunction, Request, Response } from "express";
import { AssessmentService } from "./assessment.service.js";
import { CreateAssessmentRequest, DeleteAssessmentRequest, UpdateAssessmentRequest } from "./assessment.types.js";
import { MediaRequestQuery } from "../media/media.types.js";
import { AppError } from "../../shared/errors/app.error.js";
import { MediaType } from "@prisma/client";
export class AssessmentController {
    public constructor(private readonly assessmentService: AssessmentService) { };

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const createAssessment: CreateAssessmentRequest = {
                userId: req.user.id,
                mediaId: Number(req.params.id),
                type: req.params.type as MediaType,
                review: req.body.review || null,
                rating: req.body.rating,
            }

            await this.assessmentService.create(createAssessment);
            res.json({ status_code: 201, message: "Avaliação adicionada com sucesso.", created_at: new Date().toLocaleDateString("pt-br") });
        } catch (error) {
            next(error);
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const updateAssessment: UpdateAssessmentRequest = {
                userId: req.user.id,
                mediaId: Number(req.params.id),
                type: req.params.type as MediaType,
                review: req.body.review,
                rating: req.body.rating,
            }

            await this.assessmentService.update(updateAssessment);

            res.json({ status_code: 201, message: "Avaliação adicionada com sucesso.", updated_at: new Date().toLocaleDateString("pt-br") });
        } catch (error) {
            next(error);
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const deleteAssessment: DeleteAssessmentRequest = {
                userId: req.user.id,
                mediaId: Number(req.params.id),
                type: req.params.type as MediaType,
            }

            await this.assessmentService.delete(deleteAssessment);
            res.json({ status_code: 200, message: "Avaliação deletada com sucesso.", });
        } catch (error) {
            next(error);
        }
    }


    public userAssessments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id } = req.user;
            const list = await this.assessmentService.userAssessments(id);
            res.status(200).json({ status_code: 200, data: list });
        } catch (error) {
            next(error);
        }
    }

    public mediaAssessments = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const type = this.getType(req);

            const assessments = await this.assessmentService.mediaAssessments(Number(id), type);

            res.status(200).json({ status_code: 200, data: assessments });
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