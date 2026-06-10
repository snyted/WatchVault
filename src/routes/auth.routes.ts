import { Router } from "express";
import { validateUserFields } from "../middlewares/validateUserFields.js";
import { AuthController } from "../controllers/auth.controller.js";
import { AuthService } from "../services/auth.services.js";

const router = Router();

const authService = new AuthService()
const authController = new AuthController(authService);

router.post("/register", validateUserFields, authController.register);

router.post("/login", validateUserFields, authController.login);

export default router;
