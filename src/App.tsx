import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchBooks } from './store/slices/booksSlice';
import { fetchUser } from './store/slices/userSlice';
import { Book } from './types';
import BooksList from './Components/BookList/BookList';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Селекторы для книг
  const books = useSelector((state: RootState) => state.books.books);
  const booksLoading = useSelector((state: RootState) => state.books.loading);
  const booksError = useSelector((state: RootState) => state.books.error);

  // Селекторы для пользователя
  const user = useSelector((state: RootState) => state.user);
  const userLoading = useSelector((state: RootState) => state.user.loading);
  const userError = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    dispatch(fetchBooks());
    dispatch(fetchUser());
  }, [dispatch]);

  if (booksError || userError) {
    return (
      <div>
        <p>Error loading books: {booksError}</p>
        <p>Error loading user: {userError}</p>
      </div>
    );
  }

  return (
    <div>
      {booksLoading || userLoading ? (
        <CircularProgress />
      ) : (
        <div>
          <p>{user.name}</p>
          <h1>Books</h1>
          <BooksList />
        </div>
      )}
    </div>
  );
  
};

export default App;
