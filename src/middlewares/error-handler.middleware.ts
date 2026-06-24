import { Request, Response, NextFunction } from "express";
import { ApiError } from "../errors/api.error.js";

export function errorHandler(err: Error & { status?: number }, req: Request, res: Response, next: NextFunction): void {

  if (err instanceof ApiError) {
    res.status(err.status).json({ message: err.message });
    return;
  }

  console.error("Erro não tratado:", err);

  res.status(500).json({
    message: "Erro interno no servidor. Tente novamente mais tarde."
  });
}