import { MediaType } from "@prisma/client";
import { MediaService } from "../media/media.service.js";

import { AppError } from "../../shared/errors/app.error.js";

import { IAssessmentRepository, MediaAssessmentsModelOutput } from "./assessment.types.js";
import { UserAssessmentMapper } from "./assessment.mapper.js";
import { CreateAssessmentRequest, DeleteAssessmentRequest, UpdateAssessmentRequest, UserAssessmentsResponse } from "./assessment.dtos.js";

export class AssessmentService {
  public constructor(private readonly assessmentRepository: IAssessmentRepository, private readonly mediaService: MediaService) { }

  public async create(data: CreateAssessmentRequest): Promise<void> {
    const media = await this.mediaService.findOrCreate(data.mediaId, data.type);
    const hasAssessment = await this.assessmentRepository.findById(data.userId, media.id);
    if (hasAssessment) {
      throw new AppError(409, "Avaliação já existe.");
    }

    const repositoryInput = UserAssessmentMapper.toPrisma(data, media.id);
    await this.assessmentRepository.insert(repositoryInput);
  }

  public async update(data: UpdateAssessmentRequest): Promise<void> {
    const media = await this.mediaService.findOrCreate(data.mediaId, data.type);

    if (!media.id) {
      throw new AppError(400, 'f')
    }

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
  };


  public async userAssessments(userId: number): Promise<UserAssessmentsResponse[]> {
    const data = await this.assessmentRepository.userAssessments(userId);

    if (!data) {
      throw new AppError(404, "Nenhuma review foi feita ainda.");
    };

    return data.map((d) => {
      return {
        mediaId: d.mediaId,
        title: d.media.title,
        type: d.media.type,
        review: d.review,
        rating: d.rating,
      };
    });
  };

  public async mediaAssessments(mediaId: number, type: MediaType): Promise<MediaAssessmentsModelOutput[]> {
    const media = await this.mediaService.findOrCreate(mediaId, type);
    return await this.assessmentRepository.mediaAssessments(media.id);
  }
}