import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { setQuery } from '../../store/slices/filterSlice';
import { FormControl } from '@mui/material';
let classes = require('./SearchInput.module.scss');

const SearchInput: React.FC = () => {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.filter.query); // Получаем строку поиска из слайса

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(event.target.value)); // Обновляем значение строки поиска в слайсе
  };

  return (
    <div className={classes.search_input}>
      <FormControl fullWidth>
        <input
          type="text"
          value={query} // Значение из Redux
          onChange={handleInputChange} // Обработчик изменения
          placeholder="Enter author or book name"
          className={classes.input_field} // Стили из SCSS
        />
      </FormControl>
    </div>
  );
};

export default SearchInput;
