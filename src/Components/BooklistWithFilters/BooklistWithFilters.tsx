import { useEffect, useRef, useMemo } from 'react';
import { CircularProgress, Grid2 } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import {
  fetchBooksInRange,
  incrementPage,
} from '../../store/slices/booksSlice';
import BookCard from '../BookCard/BookCard';
import SearchInput from '../SearchInput/SearchInput';
import GenreFilter from '../GenreSelect/GenreSelect';
import { PiSmileySad } from 'react-icons/pi';

let classes = require('./BooklistWithFilters.module.scss');


// combination of filtes and booklist, possibly could be a page component 
// but was made as component because any ather page component aren't needed
const BooklistWithFilters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.books.books);
  const booksLoading = useSelector((state: RootState) => state.books.loading);
  const currentPage = useSelector(
    (state: RootState) => state.books.currentPage,
  );
  const allBooksLoaded = useSelector(
    (state: RootState) => state.books.allBooksLoaded,
  );
  const query = useSelector((state: RootState) => state.filter.query);
  const genre = useSelector((state: RootState) => state.filter.genre);
  // component for endless scroll
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const booksPerPage = 10; //number of books loaded per fetch

  //load first part if booklist is empty
  useEffect(() => {
    if (books.length === 0 && !allBooksLoaded) {
      dispatch(fetchBooksInRange({ start: 0, end: booksPerPage }));
    }
  }, [dispatch, books.length, allBooksLoaded]);

  // IntersectionObserver fot endless scroll
  useEffect(() => {
    if (!sentinelRef.current || booksLoading || allBooksLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(incrementPage());
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [booksLoading, allBooksLoaded, dispatch]);

  // load next part of books when currentPage changes
  useEffect(() => {
    if (currentPage > 0 && !allBooksLoaded) {
      const start = currentPage * booksPerPage;
      const end = start + booksPerPage;

      dispatch(fetchBooksInRange({ start, end }));
    }
  }, [currentPage, dispatch, booksPerPage, allBooksLoaded]);

  // filtred books
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesQuery =
        query === '' ||
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase());
      const matchesGenre = genre === 'All' || book.genre === genre;
      return matchesQuery && matchesGenre;
    });
  }, [books, query, genre]);

  return (
    <div className={classes.container}>
      <div className={classes.filter_container}>
        <SearchInput />
        <GenreFilter />
      </div>
      <div className={classes.container_booklist}>
        <Grid2 container spacing={1} justifyContent="center" margin="auto">
          {filteredBooks.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </Grid2>
        <div ref={sentinelRef}></div>
        {booksLoading && (
          <div className={classes.spiner}>
            <CircularProgress />
          </div>
        )}
        {allBooksLoaded && (
          <div className={classes.no_more_books_container}>
            {filteredBooks.length === 0 ? (
              <p className={classes.no_more_books}>No mathces</p>
            ) : (
              <p className={classes.no_more_books}>No more books</p>
            )}
            <PiSmileySad className={classes.no_more_books_icon} />
          </div>
        )}
      </div>
    </div>
  );
};

export default BooklistWithFilters;
