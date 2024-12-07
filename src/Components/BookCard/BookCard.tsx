import React, { useCallback, useState } from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useLocation, useNavigate } from 'react-router-dom';
import { MdFavoriteBorder } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { FaHeart } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { updateFavorites } from '../../store/slices/userSlice';
import { CircularProgress } from '@mui/material';
let styles = require('./BookCard.module.scss');

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const favorites = useSelector((state: RootState) => state.user.favorites);
  const userId = useSelector((state: RootState) => state.user.id);
  const query = useSelector((state: RootState) =>
    state.filter.query.toLowerCase(),
  );

  const [localLoading, setLocalLoading] = useState(false); // Локальное состояние загрузки

  const isFavorite = favorites.includes(book.id);
  const isFavoritesPage = location.pathname === '/favorites';

  const handleCardClick = useCallback(() => {
    navigate(`/books/${book.id}`);
  }, [navigate, book.id]);

  const handleFavoriteClick = useCallback(
    async (event: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>) => {
      event.stopPropagation();

      if (!userId) {
        navigate('/login');
        return;
      }

      const updatedFavorites = isFavorite
        ? favorites.filter((favId) => favId !== book.id)
        : [...favorites, book.id];

      setLocalLoading(true); // Включаем локальный индикатор загрузки
      try {
        await dispatch(
          updateFavorites({ userId, favorites: updatedFavorites }),
        ).unwrap();
      } catch (error) {
        console.error('Failed to update favorites:', error);
      } finally {
        setLocalLoading(false); // Выключаем индикатор загрузки
      }
    },
    [dispatch, userId, isFavorite, favorites, book.id, navigate],
  );

  const highlightText = (text: string) => {
    if (isFavoritesPage || !query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span
          key={index}
          className={styles.highlight}
          data-testid={'query_span'} // data-testid для названия
        >
          {part}
        </span>
      ) : (
        part
      ),
    );
  };

  return (
    <motion.div
      className={styles.animation_div}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
    >
      <Card
        className={styles.card}
        tabIndex={0}
        onClick={handleCardClick}
        role="button"
        data-testid={`book-card-${book.id}`} // data-testid для карточки
      >
        <div className={styles.content_container}>
          <CardMedia
            className={styles.media}
            component="img"
            image={book.coverImage}
            alt={book.title}
            data-testid={`book-image-${book.id}`} // data-testid для изображения
          />
          <CardContent
            className={styles.content}
            data-testid={`card-content-${book.id}`}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              data-testid={`card-title-${book.id}`} // data-testid для названия
            >
              {highlightText(book.title)}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              data-testid={`book-author-${book.id}`}
            >
              Author: {highlightText(book.author)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Genre: {book.genre}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Rating: {book.rating}
            </Typography>
          </CardContent>
        </div>
        <button
          className={styles.favorites__button}
          onClick={handleFavoriteClick}
          disabled={localLoading}
          data-testid={`favorite-button-${book.id}`} // data-testid для кнопки добавления в избранное
          onKeyPress={(e) => e.key === 'Enter' && handleFavoriteClick(e)} // Обработчик на кнопке
        >
          {localLoading ? (
            <CircularProgress size={20} className={styles.loading_spinner} />
          ) : isFavorite ? (
            <>
              <p>Remove from favorites</p>
              <FaHeart className={styles.favorites__icon_choosen} />
            </>
          ) : (
            <>
              <p>Add to favorites</p>
              <MdFavoriteBorder />
            </>
          )}
        </button>
      </Card>
    </motion.div>
  );
};

export default BookCard;

