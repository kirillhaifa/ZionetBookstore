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
  const userId = useSelector((state: RootState) => state.user.id);
  const query = useSelector((state: RootState) => state.filter.query.toLowerCase()); // Получаем запрос для поиска

  const isFavorite = favorites.includes(book.id);

  const handleCardClick = () => {
    navigate(`/books/${book.id}`);
  };

  const handleFavoriteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();

    if (!userId) {
      navigate('/login');
      return;
    }

    isFavorite
      ? dispatch(removeFavorite(book.id))
      : dispatch(addFavorite(book.id));
  };

  // Функция для выделения совпадений
  const highlightText = (text: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className={styles.highlight}>
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <Card
      className={styles.card}
      tabIndex={0}
      onClick={handleCardClick}
      onKeyPress={(e) => e.key === 'Enter' && handleCardClick()}
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
      >
        {isFavorite ? <p>Remove from favorites</p> : <p>Add to favorites</p>}
        {isFavorite ? (
          <FaHeart className={styles.favorites__icon_choosen} />
        ) : (
          <MdFavoriteBorder />
        )}
      </button>
    </Card>
  );
};

export default BookCard;
