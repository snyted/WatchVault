import { NextFunction, Request, Response } from "express"
import { UserService } from "./user.service.js"

export class UserController {
    public constructor(private readonly userService: UserService) { }

    public userStats = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const { id, username } = req.user;

            const infos: any = await this.userService.myInfos(id, username);

            res.status(200).json(infos);
        } catch (error) {
            next(error)
        }
    }

    
}