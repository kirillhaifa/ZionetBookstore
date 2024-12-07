export interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  coverImage: string;
  rating: string;
  publishedYear: string;
}

export interface User {
  id: string | null;
  name: string | null;
  favorites: string[];
  loading: boolean;
  error: string | null;
}