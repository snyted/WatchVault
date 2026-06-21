import { LoginDTO } from "../dtos/auth/login.dto.js";
import { RegisterDTO } from "../dtos/auth/register.dto.js";
import { AuthService } from "../services/auth.service.js";
import { Request, Response, NextFunction } from 'express';

export class AuthController {
  constructor(private authService: AuthService) { }

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data: RegisterDTO = req.body;

    try {
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



