import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import '../../assets/Fonts/fonts.scss'; // Подключение шрифтов
import AddToFavoritiesButton from '../FavorotiesButton/FavoritiesButton';
import NotFound from '../NotFound/NotFound';
let classes = require('./BookDetails.module.scss'); // Подключение модульных стилей

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получаем ID книги из URL
  const book = useSelector((state: RootState) =>
    state.books.books.find((book) => book.id === id)
  ); // Ищем книгу в списке книг из Redux Store

  if (!book) {
    return <NotFound />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.imageWrapper}>
        <img src={book.coverImage} alt={book.title} className={classes.image} />
      </div>
      <div className={classes.info}>
        <h1 className={classes.title}>{book.title}</h1>
        <p className={classes.author}>Author: {book.author}</p>
        <p className={classes.genre}>Genre: {book.genre}</p>
        <p className={classes.year}>
          Published Year: {new Date(book.publishedYear).getFullYear()}
        </p>
        <p className={classes.rating}>Rating: {book.rating}/5</p>
      </div>
      <AddToFavoritiesButton id={book.id}/>
    </div>
  );
};

export default BookDetails;
