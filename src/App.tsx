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
import Layout from './Components/Layout/Layout';
import BookDetails from './Components/BookDetails/BookDetails';
import FavoritiesBooks from './Components/FavoritiesBooks/FavoritiesBooks';
import BooklistWithFilters from './Components/BooklistWithFilters/BooklistWithFilters';
import LoginForm from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const booksError = useSelector((state: RootState) => state.books.error);
  const userError = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    dispatch(fetchBooks());
    const isAuthorized = document.cookie.includes('authorized=true');
    if (isAuthorized) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  if (booksError || userError) {
    return (
      <Layout>
        <div>
          {booksError && <p>Error loading books: {booksError}</p>}
          {userError && <p>Error loading user: {userError}</p>}
        </div>
      </Layout>
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
