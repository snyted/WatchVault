import { MediaType } from "@prisma/client";
import { MediaService } from "../media/media.service.js";

import { AppError } from "../../shared/errors/app.error.js";

import { CreateAssessmentRequest, DeleteAssessmentRequest, IAssessmentRepository, UpdateAssessmentRequest, UserAssessmentsResponse } from "./assessment.types.js";

export class AssessmentService {
  public constructor(private readonly assessmentRepository: IAssessmentRepository, private readonly mediaService: MediaService) { }

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

    await this.assessmentRepository.update(data.userId, media.id, data.review);
  }

  public async delete(data: DeleteAssessmentRequest): Promise<void> {
    const media = await this.mediaService.findOrCreate(data.mediaId, data.type);
    const itFound = await this.assessmentRepository.findById(data.userId, media.id);

    if (!itFound) {
      throw new AppError(404, "A avaliação não existe, impossível reavaliar.");
    }

    await this.assessmentRepository.delete(data.userId, data.mediaId);
  }


  public async userAssessments(userId: number): Promise<UserAssessmentsResponse[]> {
    const data = await this.assessmentRepository.userAssessments(userId);
    console.log(data)
    return data.map((d) => {
      return {
        title: d.media.title,
        type: d.media.type,
        review: d.review,
        rating: d.rating
      }
    })
  }

  public async mediaAssessments(mediaId: number, type: MediaType): Promise<any[]> {
    const media = await this.mediaService.findOrCreate(mediaId, type);
    return await this.assessmentRepository.mediaAssessments(media.id, type);
  }
}