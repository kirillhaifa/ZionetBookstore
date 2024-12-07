import React from 'react';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { updateFavorites } from '../../store/slices/userSlice';
let classes = require('./FavoritiesButton.module.scss');
import { useNavigate } from 'react-router-dom';

interface Props {
  id: string;
}

const FavoritesButton: React.FC<Props> = ({ id }) => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.user.favorites);
  const userId = useSelector((state: RootState) => state.user.id);
  const loading = useSelector((state: RootState) => state.user.loading);
  const navigate = useNavigate();

  //check if current book is favorite
  const isFavorite = favorites.includes(id);

  //send data to server

  const handleClick = async () => {
    // Проверка, если userId отсутствует
    if (!userId) {
      navigate('/login'); // Перенаправляем на страницу логина
      return;
    }

    const updatedFavorites = isFavorite
      ? favorites.filter((bookId) => bookId !== id)
      : [...favorites, id];

    try {
      await dispatch(
        updateFavorites({ userId: userId!, favorites: updatedFavorites }),
      ).unwrap();
    } catch (error) {
      console.error('Failed to update favorites on the server:', error);
    }
  };

  return (
    <div>
      <Button
        variant="contained"
        color={'primary'}
        onClick={handleClick}
        disabled={loading}
        className={classes.container}
      >
        {loading
          ? 'Updating...'
          : isFavorite
            ? 'Remove from Favorites'
            : 'Add to Favorites'}
      </Button>
    </div>
  );
};

export default FavoritesButton;
