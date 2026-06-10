import { AuthService } from "../services/auth.service.js";
import { Request, Response, NextFunction } from 'express';

export class AuthController {
  constructor(private authService: AuthService) { }

  register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user, password } = req.body;
    try {
      await this.authService.register(user, password);

      res.status(201).json({ message: "Cadastro efetuado com sucesso!" });
    } catch (err) {
      next(err);
    }
  };

  login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { user, password } = req.body

    try {
      const { token, username } = await this.authService.login(user, password)

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







// export async function registerController(req, res, next) {
//   const { user, password } = req.body;
// try {
//   await register(user, password);

//   res.status(201).json({ message: "Cadastro efetuado com sucesso!" });
// } catch (err) {
//   next(err);
// }
// }

// export async function loginController(req, res, next) {
//   const { user, password } = req.body;

//   try {
//     const { token, username } = await login(user, password);

// return res.status(200).json({
//   message: "Login efetuado com sucesso!",
//   token,
//   user: username,
// });
//   } catch (err) {
//   next(err);
// }
// }
