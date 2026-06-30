import { AppUser, IUserRepository } from "./user.types.js";

export class UserService {
    public constructor(private readonly userRepository: IUserRepository) {}

    public async infos(userId: number): Promise<AppUser>  {
        return await this.userRepository.myInfos(userId)
    }
}