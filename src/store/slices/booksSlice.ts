import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Book } from '../../types';

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        'https://674f2c63bb559617b26e568b.mockapi.io/books',
      );
      if (!response.ok) {
        throw new Error('Failed to fetch books');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const fetchBooksInRange = createAsyncThunk(
  'books/fetchBooksInRange',
  async (
    { start, end, limit = 10 }: { start: number; end: number; limit?: number },
    { rejectWithValue },
  ) => {
    try {
      const books: Book[] = [];
      const totalBooksToLoad = end - start;
      let currentPage = Math.floor(start / limit) + 1; // Начальная страница
      let booksFetched = 0;

      while (booksFetched < totalBooksToLoad) {
        const response = await fetch(
          `https://674f2c63bb559617b26e568b.mockapi.io/books?page=${currentPage}&limit=${limit}`,
        );

        if (!response.ok) {
          throw new Error('Failed to fetch books');
        }

        const data: Book[] = await response.json();
        books.push(...data);

        booksFetched += data.length;
        currentPage += 1;

        if (data.length < limit) {
          // Если получили меньше, чем `limit`, значит, книг больше нет
          break;
        }
      }

      // Обрезаем книги до точного диапазона
      return books.slice(start % limit, (start % limit) + totalBooksToLoad);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

interface BooksState {
  books: Book[]; // Загруженные книги
  loading: boolean; // Состояние загрузки
  error: string | null; // Ошибки загрузки
  allBooksLoaded: boolean; // Индикатор завершения загрузки
  currentPage: number; // Текущая страница
}

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
  allBooksLoaded: false,
  currentPage: 0, // Начальная страница
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    incrementPage(state) {
      state.currentPage += 1; // Увеличиваем страницу
    },
    resetBooksState(state) {
      state.books = [];
      state.currentPage = 0;
      state.allBooksLoaded = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooksInRange.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooksInRange.fulfilled, (state, action) => {
        state.loading = false;

        // Добавляем уникальные книги
        const newBooks = action.payload.filter(
          (book) =>
            !state.books.some((existingBook) => existingBook.id === book.id),
        );
        state.books = [...state.books, ...newBooks];

        // Проверяем, загружены ли все книги
        if (action.payload.length < (action.meta.arg?.limit || 10)) {
          state.allBooksLoaded = true;
        }
      })
      .addCase(fetchBooksInRange.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload; // Сохраняем все книги
        state.allBooksLoaded = true; // Помечаем, что все книги загружены
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { incrementPage, resetBooksState } = booksSlice.actions;

export default booksSlice.reducer;
