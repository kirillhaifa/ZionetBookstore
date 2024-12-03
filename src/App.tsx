import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from './store';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchBooks } from './store/slices/booksSlice';
import { fetchUser } from './store/slices/userSlice';
import { Book } from './types';

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
          {books.map((book: Book) => (
            <div key={book.id}>
              <h3>{book.title}</h3>
              <h4>{book.author}</h4>
              <h5>{book.rating}</h5>
            </div>
          ))}
        </div>
      )}
    </div>
  );
  
};

export default App;
