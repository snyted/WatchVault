import { Router } from "express";
import { validateUserFields } from "../middlewares/validateUserFields.js";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthService } from "../services/auth.service.js";
import { UserRepository } from "../repositories/user.repository.js";

const router = Router();

const userRepository = new UserRepository()
const authService = new AuthService(userRepository)
const authController = new AuthController(authService);

router.post("/register", validateUserFields, authController.register);

router.post("/login", validateUserFields, authController.login);

export default router;
