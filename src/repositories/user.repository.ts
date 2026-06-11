import prisma from "../config/prisma.js";

export class UserRepository {
  async find(name: string) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          name: name,
        }
      })
      return user;
    } catch (error) {
      console.error("Erro ao buscar usuário por nome:", error);
      throw error;
    }
  }
  async create(name: string, hashedPassword: string) {
    try {
      const newUser = await prisma.user.create({
        data: {
          name: name,
          password: hashedPassword,
        },
      });

      return newUser;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error;
    }
  }
}
