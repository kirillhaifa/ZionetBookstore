import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Book } from '../../types';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://674f2c63bb559617b26e568b.mockapi.io/books');
    if (!response.ok) {
      throw new Error('Failed to fetch books');
    }
    return await response.json();
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

interface BooksState {
  books: Book[];
  visibleBooks: Book[];
  loading: boolean;
  error: string | null;
}

const initialState: BooksState = {
  books: [],
  visibleBooks: [],
  loading: false,
  error: null,
};

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = [...state.books, ...action.payload];
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default booksSlice.reducer;
