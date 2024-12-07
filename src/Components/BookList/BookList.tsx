import React from 'react';
import BookCard from '../BookCard/BookCard';
import { Grid2 } from '@mui/material';
import { Book } from '../../types';
let classes = require('./BookList.module.scss');

interface BookListProps {
  books: Book[]; 
}

//universal booklist component
const BookList: React.FC<BookListProps> = ({ books }) => {
  return (
      <div className={classes.container_booklist}>
        <Grid2 container spacing={1} justifyContent="center" margin="auto">
          {books.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </Grid2>
      </div>
  );
};

export default BookList;
