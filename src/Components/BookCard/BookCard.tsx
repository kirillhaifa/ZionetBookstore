import React, { useCallback, useMemo, useState } from 'react';
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
import { Book } from '../../types';
let styles = require('./BookCard.module.scss');

interface BookCardProps {
  book: Book;
}

const BookCard = ({ book }: BookCardProps) => {
  // all necessary states
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const favorites = useSelector((state: RootState) => state.user.favorites);
  const userId = useSelector((state: RootState) => state.user.id);
  const query = useSelector((state: RootState) =>
    state.filter.query.toLowerCase(),
  );

  const [localLoading, setLocalLoading] = useState(false);

  const isFavorite = favorites.includes(book.id);
  const isFavoritesPage = location.pathname === '/favorites';

  // move to details page
  const handleCardClick = useCallback(() => {
    navigate(`/books/${book.id}`);
  }, [navigate, book.id]);

  // processing favorite button click
  const handleFavoriteClick = useCallback(
    async (
      event:
        | React.MouseEvent<HTMLButtonElement>
        | React.KeyboardEvent<HTMLButtonElement>,
    ) => {
      event.stopPropagation();

      // no user - move to login
      if (!userId) {
        navigate('/login');
        return;
      }

      const updatedFavorites = isFavorite
        ? favorites.filter((favId) => favId !== book.id)
        : [...favorites, book.id];
      // change favortites list locally and on server
      setLocalLoading(true);
      try {
        await dispatch(
          updateFavorites({ userId, favorites: updatedFavorites }),
        ).unwrap();
      } catch (error) {
        console.error('Failed to update favorites:', error);
      } finally {
        setLocalLoading(false);
      }
    },
    [dispatch, userId, isFavorite, favorites, book.id, navigate],
  );

  // mark text for search
  const highlightText = useMemo(() => {
    return (text: string) => {
      if (isFavoritesPage || !query) return text;

      const regex = new RegExp(`(${query})`, 'gi');
      const parts = text.split(regex);

      return parts.map((part, index) =>
        regex.test(part) ? (
          <span
            key={index}
            className={styles.highlight}
            data-testid={'query_span'}
          >
            {part}
          </span>
        ) : (
          part
        ),
      );
    };
  }, [query, isFavoritesPage]);

  return (
    // animation library container
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
      >
        <div className={styles.content_container}>
          <CardMedia
            className={styles.media}
            component="img"
            image={book.coverImage}
            alt={book.title}
          />
          <CardContent className={styles.content}>
            <Typography gutterBottom variant="h5" component="div">
              {highlightText(book.title)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
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
          onKeyDown={(e) => e.key === 'Enter' && handleFavoriteClick(e)} // Обработчик на кнопке
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
