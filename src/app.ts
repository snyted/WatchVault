import dotenv from "dotenv";
dotenv.config();

import express from "express";
import logGlobal from "./shared/middlewares/log-global.middleware.js";
import { errorHandler } from "./shared/middlewares/error-handler.middleware.js";

import user from "./modules/user/user.routes.js";
import media from "./modules/media/media.routes.js";
import auth from "./modules/auth/auth.routes.js";

const app = express();

app.use(express.json());

app.use(logGlobal);

app.use("/api/me", user);
app.use("/api/media", media);
app.use("/api/auth", auth);
app.use("/favorite");
app.use("rating",);
app.use("review",);

app.use(errorHandler);


const PORT: string = process.env.PORT || "3000";

export { app, PORT }