import { NextFunction, Request, Response } from "express";
import { AssessmentService } from "./assessment.service.js";
import { CreateAssessmentRequest, DeleteAssessmentRequest, UpdateAssessmentRequest } from "./assessment.types.js";
export class AssessmentController {
    public constructor(private readonly assessmentService: AssessmentService) { };

    public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const createAssessment: CreateAssessmentRequest = {
                userId: req.user.id,
                mediaId: Number(req.params.id),
                type: req.body.type,
                review: req.body.review || null,
                rating: req.body.rating,
            }
            
            await this.assessmentService.create(createAssessment);
            res.json({ status_code: 201, message: "Avaliação adicionada com sucesso." });
        } catch (error) {
            next(error);
        }
    }

    public update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const updateAssessment: UpdateAssessmentRequest = {
                userId: req.user.id,
                mediaId: Number(req.params.id),
                type: req.body,
                newReview: req.body.review,
                newRating: req.body.rating,
            }

            await this.assessmentService.update(updateAssessment);

            res.json({ status_code: 201, message: "Avaliação adicionada com sucesso." });
        } catch (error) {
            next(error);
        }
    }

    public delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const deleteAssessment: DeleteAssessmentRequest = {
                userId: req.user.id,
                mediaId: Number(req.params.id),
                type: req.body.type,
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
            const { media_id: id, type } = req.body

            const assessments = await this.assessmentService.mediaAssessments(id, type);

            res.status(200).json({ status_code: 200, data: assessments });
        } catch (error) {
            next(error);
        }
    }
}