import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/app.error.js";

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction): void {

  if (err instanceof AppError) {
    res.status(err.status).json({ message: err.message, timestamp: err.timestamp });
    return;
  }

  console.error({
    status: 500,
    name: err.name,
    message: err.message,
    stack: err.stack
  });

  res.status(500).json({
    message: "Erro interno no servidor. Tente novamente mais tarde."
  });
}