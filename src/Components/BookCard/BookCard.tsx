import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { MdFavoriteBorder } from 'react-icons/md';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { FaHeart } from 'react-icons/fa6';
import { addFavorite, removeFavorite } from '../../store/slices/userSlice';
let styles = require('./BookCard.module.scss');

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const favorites = useSelector((state: RootState) => state.user.favorites);

  const isFavorite = favorites.includes(book.id);

  const handleCardClick = () => {
    navigate(`/books/${book.id}`);
  };

  const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation(); // Останавливаем всплытие события

    if (isFavorite) {
      dispatch(removeFavorite(book.id));
    } else {
      dispatch(addFavorite(book.id));
    }
  };

  return (
    <Card
      className={styles.card}
      tabIndex={0}
      onClick={handleCardClick}
      onKeyPress={(e) => e.key === 'Enter' && handleCardClick()}
      role="button"
    >
      <CardMedia
        className={styles.media}
        component="img"
        image={book.coverImage}
        alt={book.title}
      />
      <CardContent className={styles.content}>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Genre: {book.genre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {book.rating}
        </Typography>
        <button
          className={styles.favorites__button}
          onClick={handleFavoriteClick} // Обработчик кнопки
        >
          {isFavorite ? <p>Remove from favorites</p> : <p>Add to favorites</p>}
          {isFavorite ? (
            <FaHeart className={styles.favorites__icon_choosen} />
          ) : (
            <MdFavoriteBorder />
          )}
        </button>
      </CardContent>
    </Card> 
  );
};

export default BookCard;
