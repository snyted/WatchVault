import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { LoginResponse } from "../interfaces/auth.interface.js";


export class AuthService {
  constructor(private userRepository: UserRepository) {
  }

  async register(user: string, password: string): Promise<boolean> {
    const foundUser = await this.userRepository.find(user)

    if (foundUser) {
      throw new ApiError(400, "Usuário já existe.");
    }

    const hash = await bcrypt.hash(password, 10);

    await this.userRepository.create(user, hash);

    return true;

  }

  async login(userInput: string, passwordInput: string): Promise<LoginResponse> {
    if (!userInput || !passwordInput) {
      throw new ApiError(400, "Usuário e senha são obrigatórios.")
    }

    const dbUser = await this.userRepository.find(userInput)

    if (!dbUser) {
      throw new ApiError(401, "Usuário ou senha incorretos.");
    }

    const match = await bcrypt.compare(passwordInput, dbUser.password);

    if (!match) {
      throw new ApiError(401, "Usuário ou senha incorretos.");
    }

    const jwtSecret = process.env.JWT_SECRET

    if (!jwtSecret) {
      throw new Error("JWT_SECRET não está definido.");
    }

    const token = jwt.sign({ id: dbUser.id }, jwtSecret, {
      expiresIn: "1h",

    });

    return { token, username: dbUser.name };
  }
}

// export async function register(user, password) {
//   const foundUser = await findUserByName(user);
//   if (foundUser) {
//     throw new ApiError(400, "Usuário já existe.");
//   }

// const hash = await bcrypt.hash(password, 10);

// await createUser(user, hash);

// return true;
// }

// export async function login(username, password) {
//   const user = await findUserByName(username);

//   if (!user) {
//     throw new ApiError(401, "Usuário ou senha incorretos.");
//   }

// const match = await bcrypt.compare(password, user.password);

// if (!match) {
//   throw new ApiError(401, "Usuário ou senha incorretos.");
// }

// const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
//   expiresIn: "1h",
// });

//   return { token, username: user.name };
// }