import React from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite, removeFavorite } from '../../store/slices/userSlice';
import { RootState } from '../../store';
let classes = require('./FavoritiesButton.module.scss')

interface Props {
  id: string; // Проп id книги
}

const FavoritesButton: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.user.favorites); // Избранные книги из Redux

  // Проверяем, есть ли книга в избранных
  const isFavorite = favorites.includes(id);

  // Обработчик клика
  const handleClick = () => {
    if (isFavorite) {
      dispatch(removeFavorite(id)); // Удаляем из избранных
    } else {
      dispatch(addFavorite(id)); // Добавляем в избранное
    }
  };

  return (
    <div>
      <Button
        variant={'contained'} // Разный стиль для добавления/удаления
        color={'primary'} // Разный цвет
        onClick={handleClick}
        className={classes.container} // Логика кнопки
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'} {/* Текст кнопки */}
      </Button>
    </div>
  );
};

export default FavoritesButton;
