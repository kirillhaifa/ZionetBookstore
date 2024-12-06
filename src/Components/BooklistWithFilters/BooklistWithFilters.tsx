import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CircularProgress, Grid2 } from '@mui/material';
import GenreFilter from '../GenreSelect/GenreSelect';
import SearchInput from '../SearchInput/SearchInput';
import BookCard from '../BookCard/BookCard';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchBooks, setVisibleBooks } from '../../store/slices/booksSlice';
import { Book } from '../../types';

let classes = require('./BooklistWithFilters.module.scss');

const BooklistWithFilters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.books.books);
  const visibleBooks = useSelector((state: RootState) => state.books.visibleBooks);
  const booksLoading = useSelector((state: RootState) => state.books.loading);
  const query = useSelector((state: RootState) => state.filter.query);
  const genre = useSelector((state: RootState) => state.filter.genre);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const [page, setPage] = useState(1);

  // Мемоизируем фильтрацию книг
  const filteredBooks = useMemo(() => {
    return books.filter((book: Book) => {
      const matchesQuery =
        query === '' ||
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase());
      const matchesGenre = genre === 'All' || book.genre === genre;
      return matchesQuery && matchesGenre;
    });
  }, [books, query, genre]);

  // Обновляем видимые книги
  useEffect(() => {
    const startIndex = (page - 1) * 10;
    const endIndex = page * 10;
    dispatch(setVisibleBooks(filteredBooks.slice(0, endIndex)));
  }, [filteredBooks, page, dispatch]);

  // Сбрасываем страницу и очищаем видимые книги при изменении фильтров
  useEffect(() => {
    setPage(1);
    dispatch(setVisibleBooks([]));
  }, [query, genre, dispatch]);

  // Настраиваем IntersectionObserver
  useEffect(() => {
    if (!sentinelRef.current || booksLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && page * 10 < books.length) {
          dispatch(fetchBooks());
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1.0 },
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [dispatch, page, books.length]);

  return (
    <div className={classes.container}>
      <div className={classes.filter_container}>
        <SearchInput />
        <GenreFilter />
      </div>
      <div className={classes.container_booklist}>
        <Grid2 container spacing={1} justifyContent="center" margin="auto">
          {visibleBooks.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </Grid2>
        <div ref={sentinelRef}></div>
        {booksLoading && (
          <div className={classes.spiner}>
            <CircularProgress />
          </div>
        )}
      </div>
    </div>
  );
};

export default BooklistWithFilters;