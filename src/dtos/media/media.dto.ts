import { Media } from "@prisma/client";
export interface UserMediaResponseDTO extends Omit<Media, "id" | "createAt" | "updatedAt"> {
  rate?: number | null;
  review?: string | null;
  favorited?: boolean;
}