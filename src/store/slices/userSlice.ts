import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Асинхронный санк для загрузки пользователя
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

// Асинхронный санк для обновления избранного
export const updateFavorites = createAsyncThunk(
  'user/updateFavorites',
  async ({ userId, favorites }: { userId: string; favorites: string[] }, { rejectWithValue }) => {
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
      return updatedUser.Favorites; // Возвращаем обновлённый массив избранных
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    name: null,
    favorites: [],
    loading: false,
    error: null,
  },
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
        state.favorites.push(bookId); // Добавляем ID книги локально
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
        state.favorites = action.payload.Favorites || []; // Сохраняем избранные книги
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Сохраняем сообщение об ошибке
      })
      .addCase(updateFavorites.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateFavorites.fulfilled, (state, action) => {
        state.loading = false;
        state.favorites = action.payload; // Обновляем локальное избранное
      })
      .addCase(updateFavorites.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Сохраняем сообщение об ошибке
      });
  },
});

// Экспортируем действия для использования
export const { logoutUser, addFavoriteLocal, removeFavoriteLocal } = userSlice.actions;

export default userSlice.reducer;
