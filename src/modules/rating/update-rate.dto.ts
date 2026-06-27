import { ToggleFavoriteDTO } from "../favorite/toggle-favorite.dto.js";

export interface UpdateRateDTO extends ToggleFavoriteDTO {
    rate: number,
}