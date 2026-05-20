export interface Anime {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  releaseDate: string;
  status: string;
  episodes?: number;
  genres?: string[];
}

export interface SearchQuery {
  query: string;
  limit?: number;
  offset?: number;
}
