import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchBooks } from '../../store/slices/booksSlice';
import BookList from '../BookList/BookList';
import { CircularProgress } from '@mui/material';

let classes = require('./FavoritiesBooks.module.scss');

const FavoritiesBooks = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.books.books);
  const user = useSelector((state: RootState) => state.user);
  const booksLoading = useSelector((state: RootState) => state.books.loading);
  const userLoading = useSelector((state: RootState) => state.user.loading);

  //in case of reload of page there will be no books in store
  //need to load them
  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks())
        .unwrap()
        .catch((err) => console.error("Error loading books:", err));
    }
  }, []);

  // loading spiner
  if (booksLoading || userLoading) {
    return (
      <div className={classes.spinner_container}>
        <CircularProgress className={classes.spinner}/>
      </div>
    );
  }

  // filtering book when both booklist and user are in store
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
