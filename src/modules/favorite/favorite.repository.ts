import { Prisma } from "@prisma/client";
import prisma from "../../shared/config/prisma.js";
import { AppFavorite, IFavoriteRepository } from "./favorite.types.js";
import { FavoriteMapper } from "./favorite.mapper.js";

export type FavoriteWithMediaPrisma = Prisma.FavoriteGetPayload<{ include: { media: true } }>

export class FavoriteRepositoryPrisma implements IFavoriteRepository {
    public async insert(userId: number, mediaId: number): Promise<void> {
        try {
            await prisma.favorite.create({
                data: {
                    userId,
                    mediaId,
                }
            })
        } catch (error) {
            console.error(error)
            throw error
        }

    }
    public async find(userId: number, mediaId: number): Promise<AppFavorite | null> {
        try {
            const fav = await prisma.favorite.findUnique({
                where: {
                    userId_mediaId: {
                        userId,
                        mediaId,
                    }
                },
                include: {
                    media: true,
                }
            })

            if (!fav) {
                return null
            }

            return FavoriteMapper.toDomain(fav);
        } catch (error) {
            console.error(error)
            throw error
        }
    }

    public async delete(userId: number, mediaId: number): Promise<void> {
        await prisma.favorite.delete({
            where: {
                userId_mediaId: {
                    userId,
                    mediaId,
                }
            }
        })
    }



    public async userList(userId: number): Promise<AppFavorite[] | null> {
        const favs = await prisma.favorite.findMany({
            where: {
                id: userId,
            },
            include: {
                media: true,
            }
        });

        if (!favs) {
            return null;
        }

        return favs.map((fav) => FavoriteMapper.toDomain(fav))
    }
}