import React, { useState, useEffect, useRef, useMemo } from 'react';
import { CircularProgress, Grid2 } from '@mui/material';
import GenreFilter from '../GenreSelect/GenreSelect';
import SearchInput from '../SearchInput/SearchInput';
import BookCard from '../BookCard/BookCard';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../store';
import { fetchBooks } from '../../store/slices/booksSlice';
import { Book } from '../../types';

let classes = require('./BooklistWithFilters.module.scss');

const BooklistWithFilters = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.books.books);
  const booksLoading = useSelector((state: RootState) => state.books.loading);
  const query = useSelector((state: RootState) => state.filter.query);
  const genre = useSelector((state: RootState) => state.filter.genre);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Загружаем книги только при первой загрузке, если их нет
  useEffect(() => {
    if (books.length === 0) {
      dispatch(fetchBooks());
    }
  }, [dispatch]);

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

  // Настраиваем IntersectionObserver
  useEffect(() => {
    if (!sentinelRef.current || booksLoading) return;
    if (filteredBooks.length === 0) return 

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          dispatch(fetchBooks());
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(sentinelRef.current);

    return () => observer.disconnect();
  }, [books.length]);

  return (
    <div className={classes.container}>
      <div className={classes.filter_container}>
        <SearchInput />
        <GenreFilter />
      </div>
      <div className={classes.container_booklist}>
        <Grid2 container spacing={1} justifyContent="center" margin="auto">
          {filteredBooks.map((book) => (
            <BookCard book={book} key={book.id+Math.random()} />
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
