import { MediaType } from "@prisma/client";
import prisma from "../../shared/config/prisma.js";
import { AppMedia } from "./media.types.js";
import { MediaMapper } from "./media.mapper.js";


export class MediaRepository {
    public async create(data: AppMedia): Promise<AppMedia> {
        const prismaInput = MediaMapper.toPrisma(data)
        const created = await prisma.media.create({
            data: prismaInput
        })
        return MediaMapper.toDomain(created)
    }

    public async find(tmdbId: number, type: MediaType): Promise<AppMedia | null> {
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
}

// export async function findMediaOnDb(id, type) {
//     const result = await pool.query(
//         `SELECT * FROM media WHERE tmdb_id = $1 AND type = $2 LIMIT 1`,
//         [id, type]
//     );
//     return result.rows[0] || null;
// }

// export async function insertFavorite(userId, mediaId) {
//     const result = await pool.query(
//         `INSERT INTO favorites (user_id, media_id)
//      VALUES ($1, $2)
//      ON CONFLICT (user_id, media_id) DO NOTHING
//      RETURNING *`,
//         [userId, mediaId]
//     );
//     return result.rows[0] || null;
// }

// export async function deleteFavorite(userId, mediaId) {
//     await pool.query(
//         `DELETE FROM favorites
//      WHERE user_id = $1 AND media_id = $2`,
//         [userId, mediaId]
//     );
// }

// export async function findFavorite(userId, mediaId) {
//     const result = await pool.query(
//         `SELECT * FROM favorites
//      WHERE user_id = $1 AND media_id = $2`,
//         [userId, mediaId]
//     );
//     return result.rows[0] || null;
// }

// export async function findAllUserFavorites(userId) {
//     const result = await pool.query(
//         `SELECT
//   f.id as favorite_id,
//   m.*
// FROM favorites f
// JOIN media m ON f.media_id = m.id
// WHERE f.user_id = $1`,
//         [userId]
//     );

//     return result.rows;
