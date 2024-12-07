import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchBooks } from '../../store/slices/booksSlice';
import BookList from '../../Components/BookList/BookList';
import { CircularProgress } from '@mui/material';

let classes = require('./FavoritiesBooks.module.scss');

const FavoritiesBooks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.books.books);
  const user = useSelector((state: RootState) => state.user);
  const booksLoading = useSelector((state: RootState) => state.books.loading);
  const userLoading = useSelector((state: RootState) => state.user.loading);

  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks())
        .unwrap()
        .catch((err) => console.error("Error loading books:", err));
    }
  }, []);

  // Если данные еще загружаются, показываем спиннер
  if (booksLoading || userLoading) {
    return (
      <div className={classes.spinner}>
        <CircularProgress />
      </div>
    );
  }

  // Фильтруем книги только если и пользователь, и книги загружены
  const favoritiesBooks =
    books.length > 0 && user.favorites.length > 0
      ? books.filter((book) => user.favorites.includes(book.id))
      : [];

  return favoritiesBooks.length > 0 ? (
    <div className={classes.favorities__container}>
      <h2 className={classes.text}>Your favorite books</h2>
      <BookList books={favoritiesBooks} />
    </div>
  ) : (
    <h2 className={classes.text}>No favorite books yet</h2>
  );
};

export default FavoritiesBooks;
