import { User } from "@prisma/client";
import prisma from "../config/prisma.js";

export class UserRepository {
  async find(username: string): Promise<User | null> {
    try {
      return await prisma.user.findUnique({
        where: {
          username: username,
        }
      });
    } catch (error) {
      console.error("Erro ao buscar usuário por nome:", error);
      throw error;
    }
  }
  async create(username: string, hashedPassword: string): Promise<User> {
    try {
      return await prisma.user.create({
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
}
