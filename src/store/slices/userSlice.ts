import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { User } from '../../types';

// for updateFavorites thunk
interface UpdateFavoritesPayload {
  userId: string;
  favorites: string[];
}

// thunk to load user
export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { rejectWithValue }) => {
  try {
    const response = await fetch('https://674f2c63bb559617b26e568b.mockapi.io/user');
    if (!response.ok) {
      throw new Error('Failed to fetch user');
    }
    const data = await response.json();
    return data[0]; // Сохраняем только первого пользователя
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

// thunk to update favorities
export const updateFavorites = createAsyncThunk(
  'user/updateFavorites',
  async ({ userId, favorites }: UpdateFavoritesPayload, { rejectWithValue }) => {
    try {
      const response = await fetch(`https://674f2c63bb559617b26e568b.mockapi.io/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Favorites: favorites }),
      });

      if (!response.ok) {
        throw new Error(`Failed to update favorites: ${response.statusText}`);
      }

      const updatedUser = await response.json();
      return updatedUser.Favorites;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: User = {
  id: null,
  name: null,
  favorites: [],
  loading: false,
  error: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    logoutUser: (state) => {
      state.id = null;
      state.name = null;
      state.favorites = [];
      state.loading = false;
      state.error = null;
    },
    addFavoriteLocal: (state, action) => {
      const bookId = action.payload;
      if (!state.favorites.includes(bookId)) {
        state.favorites.push(bookId);
      }
    },
    removeFavoriteLocal: (state, action) => {
      state.favorites = state.favorites.filter((bookId) => bookId !== action.payload); // Удаляем книгу локально
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.favorites = action.payload.Favorites || []; 
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; 
      })
      .addCase(updateFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload;
      })
      .addCase(updateFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { logoutUser, addFavoriteLocal, removeFavoriteLocal } = userSlice.actions;

export default userSlice.reducer;
