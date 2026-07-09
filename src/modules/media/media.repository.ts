import { MediaType } from "@prisma/client";
import prisma from "../../shared/config/prisma.js";
import { AppMedia, IMediaRepository } from "./media.types.js";
import { MediaMapper } from "./media.mapper.js";


export class MediaRepositoryPrisma implements IMediaRepository {
    public async insert(data: AppMedia): Promise<AppMedia> {
        const prismaInput = MediaMapper.toPrisma(data)
        console.log(prismaInput)
        const created = await prisma.media.create({
            data: {
                tmdbId: data.tmdbId,
                title: data.title,
                overview: data.overview,
                type: data.type,
                releaseDate: data.releaseDate,
                posterPath: data.posterPath,
                backdropPath: data.backdropPath,
            }
        })
        return MediaMapper.toDomain(created)
    }

    public async findById(tmdbId: number, type: MediaType): Promise<AppMedia | null> {
        const found = await prisma.media.findUnique({
            where: {
                tmdbId_type: {
                    tmdbId,
                    type
                }
            }
        }
        );

        if (!found) return null

        return MediaMapper.toDomain(found)
    }

    public async searchByName(name: string): Promise<AppMedia[] | null> {
        const results: AppMedia[] = []

        if (!results) {
            return null
        }
        return results
    }
}