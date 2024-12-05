import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  query: string; // Строка поиска
  genre: string; // Выбранный жанр (или 'All')
}

const initialState: FilterState = {
  query: '', // Изначально строка поиска пуста
  genre: 'All', // Изначально выбран жанр "All"
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload; // Обновляем строку поиска
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload; // Обновляем выбранный жанр
    },
    resetFilters: (state) => {
      state.query = ''; // Сбрасываем строку поиска
      state.genre = 'All'; // Сбрасываем выбранный жанр
    },
  },
});

// Экспортируем экшены
export const { setQuery, setGenre, resetFilters } = filterSlice.actions;

// Экспортируем редюсер
export default filterSlice.reducer;
