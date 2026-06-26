import { Prisma } from "@prisma/client";
import prisma from "../config/prisma.js";
import { AppFavorite } from "../types/favorite.js";
import { FavoriteStorageMapper } from "./mappers/favorite-storage.mapper.js";

export type FavoriteWithMediaPrisma = Prisma.FavoriteGetPayload<{ include: { media: true } }>

export class FavoriteRepositoy {

    constructor() {

    }

    public async find(userId: number, mediaId: number): Promise<null> {
        return null
    }

    public async delete(userId: number, mediaId: number): Promise<void> {

    }

    public async insert(userId: number, mediaId: number): Promise<any> {

    }

    public async show(userId: number): Promise<AppFavorite[] | null> {
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

        return favs.map((fav) => FavoriteStorageMapper.toDomain(fav))
    }

}