import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import BookCard from '../BookCard/BookCard';
import { Grid2 } from '@mui/material';
let classes = require('./Booklist.module.scss')

const BookList: React.FC = () => {
  const books = useSelector((state: RootState) => state.books.books);
  const booksLoading = useSelector((state: RootState) => state.books.loading);

  if (booksLoading) {
    return <CircularProgress />;
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
