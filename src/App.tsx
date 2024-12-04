import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { RootState, AppDispatch } from './store';
import CircularProgress from '@mui/material/CircularProgress';
import { fetchBooks } from './store/slices/booksSlice';
import { fetchUser } from './store/slices/userSlice';
import BooksList from './Components/BookList/BookList';
import Header from './Components/Header/Header';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import BookDetailsPage from './pages/BookDetails/BookDetails';
import Favorities from './pages/Favorities/Favorities';

// import Favorites from './Components/Favorites/Favorites';
// import Login from './Components/Login/Login';
// import Home from './Components/Home/Home';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Селекторы для книг
  const booksLoading = useSelector((state: RootState) => state.books.loading);
  const booksError = useSelector((state: RootState) => state.books.error);

  // Селекторы для пользователя
  // временно!!!!!
  const user = useSelector((state: RootState) => state.user);
  const userLoading = useSelector((state: RootState) => state.user.loading);
  const userError = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    dispatch(fetchBooks());
    // dispatch(fetchUser());
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
    <Router>
      <div>
        {booksLoading ? (
          <CircularProgress />
        ) : (
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/favorites" element={<Favorities />} />
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Navigate to="/" />} />
              <Route path="/books/:id" element={<BookDetailsPage />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
