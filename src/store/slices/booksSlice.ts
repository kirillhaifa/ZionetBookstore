import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Book } from '../../types';

//fetch all books from store
//rather unsafe because it can be anormous number
//but ok for our mock data
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

//fetch 10 new book
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
          break;
        }
      }

      return books.slice(start % limit, (start % limit) + totalBooksToLoad);
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  },
);

interface BooksState {
  books: Book[]; // array of loaded books
  loading: boolean; // loading state
  error: string | null; // errors
  allBooksLoaded: boolean; // flag for case when all books 
  // are loaded to prevent new fetchs
  currentPage: number; // current page
}

const initialState: BooksState = {
  books: [],
  loading: false,
  error: null,
  allBooksLoaded: false,
  currentPage: 0, 
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    incrementPage(state) {
      state.currentPage += 1;
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

        // possible check for unique books but anneccary for our mock data
        
        // const newBooks = action.payload.filter(
        //   (book) =>
        //     !state.books.some((existingBook) => existingBook.id === book.id),
        // );

        state.books = [...state.books, ...action.payload];

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
        state.books = action.payload;
        state.allBooksLoaded = true;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { incrementPage, resetBooksState } = booksSlice.actions;

export default booksSlice.reducer;
