import { NextFunction, Request, Response } from "express"
import { UserService } from "./user.service.js"
import { UserInfoResponse } from "./user.types.js"

export class UserController {
    public constructor(private readonly userService: UserService) { }

    public infos = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const userId: number = req.body.id
            const infos: UserInfoResponse = await this.userService.infos(userId)

            res.status(200).json(infos)
        } catch (error) {
            next(error)
        }

    }
}