import { MediaService } from "../media/media.service.js";
import { UpsertReviewDTO, IAssesmentRepository, Review } from "./assessment.types.js";

export class AssessmentService {
  public constructor(private readonly assessmentRepository: IAssesmentRepository, private readonly mediaService: MediaService) { }

  public async upsert(dto: UpsertReviewDTO): Promise<void> {
    const itFound = await this.assessmentRepository.findById(dto.userId, dto.mediaId)

    if (!itFound) {
      this.assessmentRepository.insert(dto)
    }
  }

  public async userReviews(userId: number): Promise<Review[]> {
    return await this.assessmentRepository.userReviews(userId);
  }

  public async allReviews(mediaId: number): Promise<any[]> {
    return await this.assessmentRepository.mediaReviews(mediaId)
  }

  public async upsertReview(dto: UpsertReviewDTO, userId: number): Promise<any> {
    const mergeData: Review = { userId, ...dto }

    // verify if media exist on db
    const media = await this.mediaService.findOrCreate(dto.mediaId, dto.type);

    // verify if review exist on db
    const itExist = await this.assessmentRepository.findById(userId, media.id);
    if (!itExist) {
      return await this.assessmentRepository.insert(mergeData);
    }

    // update review
    return await this.assessmentRepository.update(userId, media.id, dto.review);
  }
}