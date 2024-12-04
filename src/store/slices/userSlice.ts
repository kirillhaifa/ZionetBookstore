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

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    name: null,
    favorites: [],
    loading: false,
    error: null
  },
  reducers: {
    logoutUser: (state) => {
      state.id = null;
      state.name = null;
      state.favorites = [];
      state.loading = false;
      state.error = null;
    }
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
        state.favorites = action.payload.Favorites; // Сохраняем избранные книги
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; // Сохраняем сообщение об ошибке
      });
  }
});

// Экспортируем действие для логаута
export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
