import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterState {
  query: string; // input serach value
  genre: string; // select genre value
}

const initialState: FilterState = {
  query: '', 
  genre: 'All',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload; 
    },
    setGenre: (state, action: PayloadAction<string>) => {
      state.genre = action.payload;
    },
    resetFilters: (state) => {
      state.query = '';
      state.genre = 'All';
    },
  },
});

export const { setQuery, setGenre, resetFilters } = filterSlice.actions;

export default filterSlice.reducer;
