import { NextFunction, Request, Response } from "express"
import { UserService } from "./user.service.js"

export class UserController {
    public constructor(private readonly userService: UserService) { }

    public myInfos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id: userId, username } = req.user;
            const infos: any = await this.userService.myInfos(userId, username);

            res.status(200).json(infos);
        } catch (error) {
            next(error)
        }
    }
}