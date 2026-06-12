import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../repositories/user.repository.js";
import { ApiError } from "../utils/ApiError.js";
import { RegisterDTO } from "../dtos/auth/register.dto.js";
import { LoginResponseDTO } from "../dtos/auth/login.response.dto.js";
import { LoginDTO } from "../dtos/auth/login.dto.js";

export class AuthService {
  constructor(private userRepository: UserRepository) {
  }

  async register(data: RegisterDTO): Promise<boolean> {

    if (data.password !== data.confirmPassword) {
      throw new ApiError(401, "As senhas não coincidem")
    }

    const foundUser = await this.userRepository.find(data.username)

    if (foundUser) {
      throw new ApiError(400, "Usuário já existe.");
    }

    const hash = await bcrypt.hash(data.password, 10);

    await this.userRepository.create(data.username, hash);

    return true;
  }

  async login(data: LoginDTO): Promise<LoginResponseDTO> {
    if (!data.username || !data.password) {
      throw new ApiError(400, "Usuário e senha são obrigatórios.")
    }

    const dbUser = await this.userRepository.find(data.username)

    if (!dbUser) {
      throw new ApiError(401, "Usuário ou senha incorretos.");
    }

    const match = await bcrypt.compare(data.password, dbUser.password);

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

    return { token, username: dbUser.username };
  }
}