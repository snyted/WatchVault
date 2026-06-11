

export interface MediaResponseDTO {
  tmdb_id: number;
  title: string;
  type: 'movie' | 'serie';
  overview: string | null;
  poster_path: string | null;
  backdrop_path: string | null;
  rate?: number | null;
  review?: string | null;
  favorited?: boolean;
}