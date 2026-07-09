import { Assessment as AssessmentModel, MediaType, Prisma, } from "@prisma/client";
import prisma from "../../shared/config/prisma.js";
import { Assessment, IAssessmentRepository } from "./assessment.types.js";

export class AssessmentRepositoryPrisma implements IAssessmentRepository {
    public async insert(data: Assessment): Promise<void> {
        console.log(data);
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

    public async userAssessments(userId: number): Promise<any[]> {
        return prisma.assessment.findMany({
            where: {
                userId,
            },
            select: {
                user: {
                    select: {
                        username: true
                    }
                },
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

    public async mediaAssessments(mediaId: number, type: MediaType): Promise<any> {
        return prisma.media.findUnique({
            where: {
                tmdbId_type: {
                    tmdbId: mediaId,
                    type
                }
            },
            select: {
                assessments: true
            }
        });
    }
}