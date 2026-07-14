import { Assessment as AssessmentModel } from "@prisma/client";
import prisma from "../../shared/config/prisma.js";
import { IAssessmentRepository, MediaAssessmentsModelOutput, UserAssessmentsModel, UserAssessmentsModelInput } from "./assessment.types.js";

export class AssessmentRepositoryPrisma implements IAssessmentRepository {
    public async insert(data: UserAssessmentsModelInput): Promise<void> {
        await prisma.assessment.create({
            data
        });
    }

    public async update(userId: number, mediaId: number, review: string): Promise<void> {
        await prisma.assessment.update({
            where: {
                userId_mediaId: {
                    userId,
                    mediaId,
                },
            },
            data: {
                review
            }
        });
    }

    public async delete(userId: number, mediaId: number): Promise<void> {
        await prisma.assessment.delete({
            where: {
                userId_mediaId: {
                    userId,
                    mediaId,
                }
            }
        });
    }

    public async findById(userId: number, mediaId: number): Promise<AssessmentModel | null> {
        const assessment = await prisma.assessment.findUnique({
            where: {
                userId_mediaId: {
                    userId,
                    mediaId,
                }
            }
        });

        if (!assessment) {
            return null;
        }

        return assessment;
    }

    public async userAssessments(userId: number): Promise<UserAssessmentsModel[]> {
        return prisma.assessment.findMany({
            where: {
                userId,
            },
            select: {
                mediaId: true,
                media: {
                    select: {
                        title: true,
                        type: true,
                    }
                },
                review: true,
                rating: true,
            }
        });
    }

    public async mediaAssessments(mediaId: number): Promise<MediaAssessmentsModelOutput[]> {
        return prisma.assessment.findMany({
            where: {
                mediaId
            }, select: {
                id: true,
                user: {
                    select: {
                        username: true
                    }
                },
                review: true,
                rating: true,
            }
        })
    }
}   