import { UserController } from "./user.controller.js";
import { UserRepositoryPrisma } from "./user.repository.js";
import { UserService } from "./user.service.js";

export const userController = new UserController(new UserService(new UserRepositoryPrisma))