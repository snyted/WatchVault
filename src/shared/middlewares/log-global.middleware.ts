import { NextFunction, Request, Response } from "express";

// Middleware logging
export default function logGlobal(req: Request, res: Response, next: NextFunction) {
    console.log("Requisição feita: " + req.method);
    next();
  }