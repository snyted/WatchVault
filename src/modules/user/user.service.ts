
import { AppError } from "../../shared/errors/app.error.js";
import { IUserRepository } from "./user.types.js";

export class UserService {
    public constructor(private readonly userRepository: IUserRepository) { }

    public async myInfos(userId: number, username: string): Promise<any> {
        const isRegistered = await this.userRepository.find(username)

        if (!isRegistered) {
            throw new AppError(404, 'Usuário não existe. Entre em contato com o suporte, ou tente se registrar.')
        }

        const rawStats = await Promise.all([
            this.userRepository.userReviewCount(userId),
            this.userRepository.userFavoriteCount(userId),
        ]);
        const stats = {
            review_quantity: rawStats[0].review,
            favorite_quantity: rawStats[1],
        }

        return {
            username,
            stats,
        }
    }
}