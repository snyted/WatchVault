import { LoginDTO, RegisterDTO } from "./auth.dtos.js";
import { ApiError } from "../../shared/errors/api.error.js";
import { AuthService } from "./auth.service.js";
import { Request, Response, NextFunction } from 'express';

export class AuthController {
  constructor(private authService: AuthService) { }

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: RegisterDTO = req.body;

      if (!data.hasOwnProperty("username") || !data.hasOwnProperty("password") || !data.hasOwnProperty("confirmPassword")) {
        throw new ApiError(400, "Missing register fields. Verify the keys names.")
      }

      if (!data.username || !data.password || !data.confirmPassword) {
        throw new ApiError(400, "Wrong fields. Verify the keys names")
      }

      await this.authService.register(data);

      res.status(201).json({ message: "Cadastro efetuado com sucesso!" });
    } catch (err) {
      next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data: LoginDTO = req.body

    try {
      const { token, username } = await this.authService.login(data)

      res.status(200).json({
        message: "Login efetuado com sucesso!",
        token,
        user: username,
      });
    } catch (error) {
      next(error)
    }
  }
}



