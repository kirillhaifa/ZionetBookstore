import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import { RootState, AppDispatch } from './store';
import { fetchUser } from './store/slices/userSlice';
import Layout from './Components/Layout/Layout';
import BookDetails from './Components/BookDetails/BookDetails';
import FavoritiesBooks from './Components/FavoritiesBooks/FavoritiesBooks';
import BooklistWithFilters from './Components/BooklistWithFilters/BooklistWithFilters';
import LoginForm from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const booksError = useSelector((state: RootState) => state.books.error);
  const userError = useSelector((state: RootState) => state.user.error);

  useEffect(() => {
    const isAuthorized = document.cookie.includes('authorized=true');
    if (isAuthorized) {
      dispatch(fetchUser());
    }
  }, [dispatch]);

  //errros displaying
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
      {/* Layoutis a combination of header, navigation and footer */}
      <Layout> 
        <Routes>
          <Route path="/" element={<BooklistWithFilters />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="*" element={<NotFound />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/favorites" element={<FavoritiesBooks />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
