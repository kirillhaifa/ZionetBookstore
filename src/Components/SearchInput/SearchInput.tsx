import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setQuery } from '../../store/slices/filterSlice';
import { FormControl } from '@mui/material';
let classes = require('./SearchInput.module.scss');

const SearchInput: React.FC = () => {
  const dispatch = useDispatch();
  //input string from store
  const query = useSelector((state: RootState) => state.filter.query);

  //in case of change dispatch new string
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value)); // Обновляем значение строки поиска в слайсе
  };

  return (
    <div className={classes.search_input} data-testid="search-input-container">
      <FormControl fullWidth>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder="Enter author or book name"
          className={classes.input_field}
          data-testid="search-input"
        />
      </FormControl>
    </div>
  );
};

export default SearchInput;
