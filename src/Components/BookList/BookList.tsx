import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import BookCard from '../BookCard/BookCard';
import { Grid2 } from '@mui/material';
import { Book } from '../../types';
let classes = require('./BookList.module.scss');

interface BookListProps {
  books: Book[]; // Массив книг
  isLoading?: boolean; // Индикатор загрузки
}

const BookList: React.FC<BookListProps> = ({ books, isLoading = false }) => {
  if (isLoading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <Grid2 container spacing={1} justifyContent="center">
        {books.map((book) => (
          <BookCard book={book} key={book.id} />
        ))}
      </Grid2>
    </div>
  );
};

export default BookList;
