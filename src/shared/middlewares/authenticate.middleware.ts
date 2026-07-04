import { NextFunction, Request, Response } from "express";
import jwt, { Secret } from "jsonwebtoken";
import { AppError } from "../errors/app.error.js";

export function authenticate(req: Request, res: Response, next: NextFunction) {
    try {
        const { authorization } = req.headers;
        if (!authorization) {
            throw new AppError(401, 'Não autorizado');
        }

        const [, token] = authorization.split(" ");
        const decoded = jwt.verify(token, process.env.JWT_SECRET as Secret);
        console.log(`token decoded: ${JSON.stringify(decoded)}`);
        req.user = decoded;

        next();
    } catch (error) {
        next(error)
    }
}
