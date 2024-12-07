import React from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { updateFavorites } from '../../store/slices/userSlice'; // Асинхронный thunk
let classes = require('./FavoritiesButton.module.scss');

interface Props {
  id: string; // Проп id книги
}

const FavoritesButton: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.user.favorites); // Избранное
  const userId = useSelector((state: RootState) => state.user.id); // ID пользователя
  const loading = useSelector((state: RootState) => state.user.loading); // Индикатор загрузки

  const isFavorite = favorites.includes(id);

  const handleClick = async () => {
    const updatedFavorites = isFavorite
      ? favorites.filter((bookId) => bookId !== id)
      : [...favorites, id];

    try {
      await dispatch(updateFavorites({ userId: userId!, favorites: updatedFavorites })).unwrap();
    } catch (error) {
      console.error('Failed to update favorites on the server:', error);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color={'primary'} // Цвет кнопки зависит от состояния
        onClick={handleClick}
        disabled={loading} // Блокируем кнопку во время загрузки
        className={classes.container}
      >
        {loading ? 'Updating...' : isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </Button>
    </div>
  );
};

export default FavoritesButton;
