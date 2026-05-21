import dotenv from "dotenv";
dotenv.config();

import express from "express";
import logGlobal from "./middlewares/logGlobal.js";
import { errorHandler } from "./middlewares/errorHandler.js";

import user from "./routes/userRoutes.js";
import search from "./routes/searchRoutes.js";
import movies from "./routes/moviesRoutes.js";
import series from "./routes/seriesRoutes.js";
import auth from "./routes/authRoutes.js";

const app = express();

const PORT = process.env.PORT || 5432;

app.use(express.json());

app.use(logGlobal);

app.use("/me", user);
app.use("/search", search);
app.use("/movies", movies);
app.use("/series", series);
app.use("/auth", auth);

app.use(errorHandler);

app.listen(PORT, () => console.log("servidor rodando na porta " + PORT));
