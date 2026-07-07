import { MediaType } from "@prisma/client";
import prisma from "../../shared/config/prisma.js";
import { IAssesmentRepository, Assessment } from "./assessment.types.js";

export class AssessmentRepositoryPrisma implements IAssesmentRepository {
    public async insert(data): Promise<void> {
        console.log(data)
        try {
            await prisma.assessment.create({
                data: {
                    userId: data.userId,
                    mediaId: data.mediaId,
                    review: data.review,
                    rating: data.rating,
                }
            })
        }
        catch (error: unknown) {
            console.error(error);
            throw error
        }
    }
    public async update(userId: number, mediaId: number, newReview: string): Promise<Review> {
        try {
            const updated = await prisma.assessment.update({
                where: {
                    userId_mediaId: {
                        userId,
                        mediaId,
                    },
                },
                data: {
                    review: newReview,
                }, select: {
                    userId: true,
                    mediaId: true,
                    review: true,
                    rating: true,
                }
            })
            return updated;
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    public async delete(userId: number, mediaId: number): Promise<void> {
        try {
            await prisma.assessment.delete({
                where: {
                    userId_mediaId: {
                        userId,
                        mediaId,
                    }
                }
            });
        } catch (error) {
            console.error(error);
            throw error;
        };

    }

    public async findById(userId: number, mediaId: number): Promise<any> {
        try {
            const assessment = await prisma.assessment.findUnique({
                where: {
                    userId_mediaId: {
                        userId,
                        mediaId,
                    }
                }
            })

            if (!assessment) {
                return null;
            }
            return assessment;
        } catch (error) {
            console.error(error)
            throw error
        }

    }

    public async userAssessments(userId: number): Promise<Assessment[]> {
        try {
            const list = prisma.assessment.findMany({
                where: {
                    userId,
                },
                select: {
                    userId: true,
                    mediaId: true,
                    review: true,
                    rating: true,
                }
            });
            return list;
        } catch (error) {
            console.error(error);
            throw error;
        };

    };

    public async mediaAssessments(mediaId: number, type: MediaType): Promise<Assessment[]> {
        try {
            const list = prisma.assessment.findMany({
                where: {
                    mediaId,
                    type
                },
                select: {
                    userId: true,
                    mediaId: true,
                    type: true,
                    review: true,
                    rating: true,
                }
            });
            return list
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};