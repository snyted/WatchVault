import { User } from "@prisma/client";
import prisma from "../../shared/config/prisma.js";
import { AppUser, IUserRepository } from "./user.types.js";

export class UserRepositoryPrisma implements IUserRepository {

  // auth context
  public async create(username: string, hashedPassword: string): Promise<void> {
    try {
      await prisma.user.create({
        data: {
          username: username,
          password: hashedPassword,
        },
      });

    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  }

  public async find(username: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          username: username,
        }
      });

      if (!user) {
        return null
      }

      return user;
    } catch (error) {
      console.error("Erro ao buscar usuário por nome:", error);
      throw error;
    }
  }

  public async myInfos(userId: number): Promise<AppUser> {
    const favoritesQuantity = await prisma.favorite.count(
      {
        where: {
          id: userId
        }
      }
    )
    const assessmentQuatity = await prisma.assessment.count(
      {
        where: {
          id: userId
        }
      }
    )


    const user: AppUser = {
      userId,
      username: 'x',
      favoritesQuantity,
      reviewsQuantity: assessmentQuatity,
      ratingsQuantity: assessmentQuatity,
    }
    return user
  }
}
