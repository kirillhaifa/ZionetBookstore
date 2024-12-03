export interface Book {
  id: string; // Поле "id" — строка
  title: string; // Поле "title" — строка
  author: string; // Поле "author" — строка
  genre: string; // Поле "genre" — строка
  publishedYear: string; // Поле "publishedYear" — строка в формате даты
  rating: number; // Поле "rating" должно быть числом
  coverImage: string; // Поле "coverImage" — строка (URL-адрес)
}

export interface BooksState {
  books: Book[];
  loading: boolean;
  error: string | null;
}


