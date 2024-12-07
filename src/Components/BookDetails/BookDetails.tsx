import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchUser } from '../../store/slices/userSlice';
import '../../assets/Fonts/fonts.scss'; // Подключение шрифтов
import AddToFavoritiesButton from '../FavorotiesButton/FavoritiesButton';
import NotFound from '../NotFound/NotFound';
import { fetchBookById } from '../../utils/api'; // Функция для фетчинга книги
import { CircularProgress } from '@mui/material';
let classes = require('./BookDetails.module.scss'); // Подключение модульных стилей

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получаем ID книги из URL
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user); // Состояние пользователя из Redux
  const [book, setBook] = useState(null); // Локальное состояние для книги
  const [loading, setLoading] = useState(true); // Состояние загрузки
  const [error, setError] = useState<string | null>(null); // Состояние ошибки

  // Проверяем наличие пользователя и загружаем его при необходимости
  useEffect(() => {
    if (!user.id) {
      dispatch(fetchUser())
        .unwrap()
        .catch((err) => {
          console.error('Failed to fetch user:', err);
          setError('Failed to load user data.');
        });
    }
  }, [dispatch, user.id]);

  // Фетчим книгу при монтировании компонента или изменении ID
  useEffect(() => {
    if (!id) {
      setError('Book ID is missing');
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchBookById(id)
      .then((fetchedBook) => {
        setBook(fetchedBook);
      })
      .catch((err) => {
        console.error('Failed to fetch book:', err);
        setError('Failed to load book details.');
      })
      .finally(() => setLoading(false));
  }, [id]);
  // Показываем сообщение об ошибке, если не удалось загрузить
  if (error) {
    return <div className={classes.error}>{error}</div>;
  }

  // Показываем спиннер при загрузке
  if (loading) {
    return (
      <div className={classes.spiner}>
        <CircularProgress />
      </div>
    );
  }

  // Показываем компонент NotFound, если книга не найдена
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
      <AddToFavoritiesButton id={book.id} />
    </div>
  );
};

export default BookDetails;
