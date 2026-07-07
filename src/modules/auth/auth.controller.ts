import { LoginDTO, RegisterDTO } from "./auth.dtos.js";
import { AppError } from "../../shared/errors/app.error.js";
import { AuthService } from "./auth.service.js";
import { Request, Response, NextFunction } from 'express';

export class AuthController {
  public constructor(private authService: AuthService) { }

  public register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: RegisterDTO = req.body;

      if (!data.username || !data.password || !data.confirmPassword) {
        throw new AppError(400, "Wrong fields. Verify the keys names")
      }

      await this.authService.register(data);

      res.status(201).json({ message: "Cadastro efetuado com sucesso!" });
    } catch (err) {
      next(err);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const data: LoginDTO = req.body
      if (!data.username || !data.password) {
        throw new AppError(400, "Missing Fields");
      }

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



