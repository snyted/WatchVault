import dotenv from "dotenv";
dotenv.config();

import express from "express";
import logGlobal from "./middlewares/logGlobal.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import user from "./routes/userRoutes.js";
import medias from "./routes/media.routes.js";
import auth from "./routes/auth.routes.js";

const app = express();

const PORT: string = process.env.PORT || "3000";

app.use(express.json());

app.use(logGlobal);

app.use("/api/me", user);
app.use("/api/medias", medias);
app.use("/api/auth", auth);

app.use(errorHandler);

app.listen(PORT, () => console.log("servidor rodando na porta " + PORT));
