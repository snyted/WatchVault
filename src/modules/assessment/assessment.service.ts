import { UpsertReviewDTO, IAssesmentRepository, Review } from "./assessment.types.js";

export class AssessmentService {
  public constructor(private readonly assessmentRepository: IAssesmentRepository) { }

  public async upsert(dto: UpsertReviewDTO): Promise<void> {
      const itFound = await this.assessmentRepository.findById(dto.userId, dto.mediaId)

      if(!itFound)  {
         this.assessmentRepository.insert(dto) 
      }
  }

  public async userReviews(userId: number): Promise<Review[]> {
    return await this.assessmentRepository.userReviews(userId);
  }

  


}