import { ToggleFavoriteDTO } from "./toggle-favorite.dto.js";

export interface UpdateRateDTO extends ToggleFavoriteDTO{
    rate: number,
}