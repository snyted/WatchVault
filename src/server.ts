import dotenv from "dotenv";
dotenv.config();

import express from "express";
import logGlobal from "./middlewares/logGlobal.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import user from "./routes/userRoutes.js";
import search from "./routes/searchRoutes.js";
import movies from "./routes/moviesRoutes.js";
import series from "./routes/seriesRoutes.js";
import auth from "./routes/auth.routes.js";

const app = express();

const PORT: string = process.env.PORT || "3000";

app.use(express.json());

app.use(logGlobal);

app.use("/api/me", user);
app.use("/api/search", search);
app.use("/api/movies", movies);
app.use("/api/series", series);
app.use("/api/auth", auth);

app.use(errorHandler);

app.listen(PORT, () => console.log("servidor rodando na porta " + PORT));
