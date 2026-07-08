import { Assessment as AssessmentModel, MediaType, Prisma, } from "@prisma/client";
import prisma from "../../shared/config/prisma.js";
import { Assessment, IAssessmentRepository } from "./assessment.types.js";

export class AssessmentRepositoryPrisma implements IAssessmentRepository {
    public async insert(data: Assessment): Promise<void> {
        console.log(data)
        try {
            await prisma.assessment.create({
                data
            })
        }
        catch (error) {
            console.error(error);
            throw error;
        }
    }
    public async update(userId: number, mediaId: number, review: string): Promise<void> {
        try {
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
            })
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

    public async findById(userId: number, mediaId: number): Promise<AssessmentModel | null> {
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

    public async userAssessments(userId: number): Promise<any[]> {
        try {
            const list = prisma.assessment.findMany({
                where: {
                    userId,
                },
                select: {
                    userId: true,
                    user: {
                        select: {
                            username: true
                        }
                    },
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

    public async mediaAssessments(mediaId: number, type: MediaType): Promise<any[]> {
        try {
            const list = prisma.media.findUnique({
                where: {
                    tmdbId_type: {
                        tmdbId: mediaId,
                        type
                    }
                }, select: {
                    assessments: true
                }
            });
            return list;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
};