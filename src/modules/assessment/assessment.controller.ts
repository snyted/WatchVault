import { NextFunction, Request, Response } from "express";
import { AssessmentService } from "./assessment.service.js";
import { CreateAssessmentRequest, DeleteAssessmentRequest, UpdateAssessmentRequest } from "./assessment.dtos.js";
import { AppMediaType, MediaRequestQuery } from "../media/media.types.js";
import { AppError } from "../../shared/errors/app.error.js";
export class AssessmentController {
    public constructor(private readonly assessmentService: AssessmentService) { };

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const createAssessment: CreateAssessmentRequest = {
                userId: req.user.id,
                mediaId: Number(req.params.id),
                type: this.getType(req),
                review: req.body.review || null,
                rating: req.body.rating,
            }

            const result = await this.assessmentService.create(createAssessment);
            res.json({ message: "Avaliação adicionada com sucesso.", data: result });
        } catch (error) {
            next(error);
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const updateAssessment: UpdateAssessmentRequest = {
                userId: req.user.id,
                mediaId: Number(req.params.id),
                type: this.getType(req),
                review: req.body.review,
                rating: req.body.rating,
            }

            const result = await this.assessmentService.update(updateAssessment);

            res.json({ message: "Avaliação adicionada com sucesso.", data: result });
        } catch (error) {
            next(error);
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const deleteAssessment: DeleteAssessmentRequest = {
                userId: req.user.id,
                mediaId: Number(req.params.id),
                type: this.getType(req),
            }

            await this.assessmentService.delete(deleteAssessment);
            res.json({ message: "Avaliação deletada com sucesso.", });
        } catch (error) {
            next(error);
        }
    }


    public userAssessments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id, username } = req.user;
            const result = await this.assessmentService.userAssessments(id);
            res.status(200).json({ data: { username, result } });
        } catch (error) {
            next(error);
        }
    }

    public mediaAssessments = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id } = req.params;
            const type = this.getType(req);

            const assessments = await this.assessmentService.mediaAssessments(Number(id), type);

            const assessmentMapped = assessments.map((assessment => {
                return {
                    id: assessment.id,
                    user: assessment.user.username,
                    review: assessment.review, rating: assessment.rating
                }
            }))

            res.status(200).json({ data: assessmentMapped });
        } catch (error) {
            next(error);
        }
    }

    private getType = (req: Request) => {

        const { type } = req.query as MediaRequestQuery

        if (type !== 'movie' && type !== 'tv') {
            throw new AppError(400, "Tipo inválido. Tente 'movie' ou 'tv'")
        }
        return type as AppMediaType
    }
}