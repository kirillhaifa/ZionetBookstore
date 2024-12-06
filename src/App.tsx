import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { RootState, AppDispatch } from './store';
import { fetchBooks } from './store/slices/booksSlice';
import { fetchUser } from './store/slices/userSlice';
import CircularProgress from '@mui/material/CircularProgress';
// import Home from './pages/Home/Home';
// import Login from './pages/Login/Login';
// import Favorities from './pages/Favorities/Favorities';
import Layout from './Components/Layout/Layout';
import BookList from './Components/BookList/BookList';
import BookDetails from './Components/BookDetails/BookDetails';
import FavoritiesBooks from './Components/FavoritiesBooks/FavoritiesBooks';
import BooklistWithFilters from './Components/BooklistWithFilters/BooklistWithFilters';
import LoginForm from './Components/Login/Login';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector((state: RootState) => state.books.books); // Все книги

  const booksError = useSelector((state: RootState) => state.books.error);
  const userError = useSelector((state: RootState) => state.user.error);
  const user = useSelector((state: RootState) => state.user); // Данные пользователя

  useEffect(() => {
    dispatch(fetchBooks());
    const isAuthorized = document.cookie.includes('authorized=true');
    if (isAuthorized) {
      dispatch(fetchUser());
    }
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
      <Layout>
        <Routes>
          <Route path="/" element={<BooklistWithFilters />} />
          <Route path="/favorites" element={<FavoritiesBooks />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
