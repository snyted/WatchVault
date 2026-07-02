import prisma from "../../shared/config/prisma.js";
import { IAssesmentRepository, Review } from "./assessment.types.js";

export class AssessmentRepositoryPrisma implements IAssesmentRepository {
    public async insert(data: Review): Promise<void> {
        try {
            await prisma.assessment.create({
                data
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

    public async findById(userId: number, mediaId: number): Promise<boolean> {
        try {
            const itFound = await prisma.assessment.findUnique({
                where: {
                    userId_mediaId: {
                        userId,
                        mediaId,
                    }
                }
            })

            if (!itFound) {
                return false;
            }
            return true;
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

    public async userReviews(userId: number): Promise<Review[]> {
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

    public async mediaReviews(mediaId: number): Promise<Review[]> {
        try {
            const list = prisma.assessment.findMany({
                where: {
                    mediaId,
                },
                select: {
                    userId: true,
                    mediaId: true,
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