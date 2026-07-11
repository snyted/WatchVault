import { Prisma } from "@prisma/client";
import prisma from "../../shared/config/prisma.js";
import { AppFavorite, IFavoriteRepository } from "./favorite.types.js";
import { FavoriteMapper } from "./favorite.mapper.js";

export type FavoriteWithMediaPrisma = Prisma.FavoriteGetPayload<{ include: { media: true } }>

export class FavoriteRepositoryPrisma implements IFavoriteRepository {
    public async insert(userId: number, mediaId: number): Promise<void> {
        await prisma.favorite.create({
            data: {
                userId,
                mediaId,
            }
        })
    }
    public async find(userId: number, mediaId: number): Promise<AppFavorite | null> {
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
        });

        if (!fav) {
            return null;
        }
        return FavoriteMapper.toDomain(fav);
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



    public async userList(userId: number): Promise<AppFavorite[]> {
        const favs = await prisma.favorite.findMany({
            where: {
                id: userId,
            },
            include: {
                media: true,
            }
        });

        return favs.map((fav) => FavoriteMapper.toDomain(fav))
    }
}