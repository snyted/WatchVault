import dotenv from "dotenv";
dotenv.config();

import express from "express";
import logGlobal from "./middlewares/log-global.middleware.js";
import { errorHandler } from "./middlewares/error-handler.middleware.js";

import user from "./routes/user.routes.js";
import media from "./routes/media.routes.js";
import auth from "./routes/auth.routes.js";

const app = express();

app.use(express.json());

app.use(logGlobal);

app.use("/api/me", user);
app.use("/api/medias", media);
app.use("/api/auth", auth);

app.use(errorHandler);


const PORT: string = process.env.PORT || "3000";

export { app, PORT }