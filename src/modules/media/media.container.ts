import { MediaController } from "./media.controller.js";
import { MediaService } from "./media.service.js";
import { MediaRepositoryPrisma } from "./media.repository.js";
import { TMDBProvider } from "../../shared/providers/tmdb/tmdb.provider.js";

const tmdbProvider = new TMDBProvider()

const mediaRepository = new MediaRepositoryPrisma()
const mediaService = new MediaService(mediaRepository, tmdbProvider)


export const mediaController = new MediaController(mediaService)
