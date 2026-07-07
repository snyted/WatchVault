import { MediaType } from "@prisma/client";
import { MediaService } from "../media/media.service.js";

import { AppError } from "../../shared/errors/app.error.js";

import { CreateAssessmentRequest, DeleteAssessmentRequest, IAssesmentRepository, UpdateAssessmentRequest } from "./assessment.types.js";

export class AssessmentService {
  public constructor(private readonly assessmentRepository: IAssesmentRepository, private readonly mediaService: MediaService) { }

  public async create(data: CreateAssessmentRequest): Promise<void> {
    const media = await this.mediaService.findOrCreate(data.mediaId, data.type);
    console.log(media.id, media.title)
    const itFound = await this.assessmentRepository.findById(data.userId, media.id);
    console.log(itFound)
    if (itFound) {
      throw new AppError(409, "Avaliação já existe.");
    }

    await this.assessmentRepository.insert({ ...data, mediaId: media.id });
  }

  public async update(data: UpdateAssessmentRequest): Promise<void> {
    const media = await this.mediaService.findOrCreate(data.mediaId, data.type);
    const itFound = await this.assessmentRepository.findById(data.userId, media.id);

    if (!itFound) {
      throw new AppError(404, "A avaliação não existe, impossível reavaliar.")
    }

    await this.assessmentRepository.update(data.userId, media.id, data.newReview);
  }

  public async delete(data: DeleteAssessmentRequest): Promise<void> {
    const media = await this.mediaService.findOrCreate(data.mediaId, data.type);
    const itFound = await this.assessmentRepository.findById(data.userId, media.id);

    if (!itFound) {
      throw new AppError(404, "A avaliação não existe, impossível reavaliar.");
    }

    await this.assessmentRepository.delete(data.userId, data.mediaId);
  }


  public async userAssessments(userId: number): Promise<any> {
    return await this.assessmentRepository.userAssessments(userId);
  }

  public async mediaAssessments(mediaId: number, type: MediaType): Promise<any[]> {
    return await this.assessmentRepository.mediaAssessments(mediaId, type);
  }
}