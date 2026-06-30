import { User } from "@prisma/client"

export interface IUserRepository {
    // auth context
    create(username: string, hashedPassword: string): Promise<void>,
    find(username: string): Promise<User | null>

    // user context
    myInfos(userId: number): Promise<AppUser>
}

export interface AppUser {
    userId: number,
    username: string,
    reviewsQuantity: number,
    ratingsQuantity: number,
    favoritesQuantity: number,
}

export type UserInfoResponse = Omit<AppUser, 'userId'>