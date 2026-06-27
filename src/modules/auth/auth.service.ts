import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../user/user.repository.js";
import { ApiError } from "../../shared/errors/api.error.js";
import { LoginDTO, LoginResponseDTO, RegisterDTO } from "./auth.dtos.js";

export class AuthService {
  constructor(private userRepository: UserRepository) {
  }

  public async register(data: RegisterDTO): Promise<boolean> {

    if (data.password !== data.confirmPassword) {
      throw new ApiError(400, "Unmatching passwords.")
    }

    if (data.password.length < 8 || data.password.length > 64) {
      throw new ApiError(400, "Invalid password. Try at least 8 characters.")
    }

    const foundUser = await this.userRepository.find(data.username)

    if (foundUser) {
      throw new ApiError(400, "User already exists.");
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