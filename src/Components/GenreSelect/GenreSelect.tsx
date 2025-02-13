import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import {
  FormControl,
  MenuItem,
  Select,
  Box,
  SelectChangeEvent,
} from '@mui/material';
import { setGenre } from '../../store/slices/filterSlice';
let classes = require('./GenreSelect.module.scss');

//genre select filter. uses store for value
const GenreFilter: React.FC = () => {
  const dispatch = useDispatch();
  const genre = useSelector((state: RootState) => state.filter.genre);

  const handleChange = (event: SelectChangeEvent) => {
    dispatch(setGenre(event.target.value));
  };

  return (
    <Box className={classes.filterContainer}>
      <FormControl fullWidth>
        <Select
          value={genre}
          onChange={handleChange}
          className={classes.genreSelect}
          displayEmpty
        >
          <MenuItem value="All">All genres</MenuItem>
          <MenuItem value="Tragedy">Tragedy</MenuItem>
          <MenuItem value="Adventure">Adventure</MenuItem>
          <MenuItem value="Dystopian">Dystopian</MenuItem>
          <MenuItem value="Drama">Drama</MenuItem>
          <MenuItem value="Romance">Romance</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default GenreFilter;
