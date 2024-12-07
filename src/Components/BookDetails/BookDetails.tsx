import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchUser } from '../../store/slices/userSlice';
import '../../assets/Fonts/fonts.scss';
import AddToFavoritiesButton from '../FavorotiesButton/FavoritiesButton';
import NotFound from '../NotFound/NotFound';
import { fetchBookById } from '../../utils/api';
import { CircularProgress } from '@mui/material';
let classes = require('./BookDetails.module.scss');

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); //gets book id frpmo url
  const dispatch = useDispatch<AppDispatch>();

  const user = useSelector((state: RootState) => state.user);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for user presence and load it if necessary
  useEffect(() => {
    if (!user.id) {
      dispatch(fetchUser())
        .unwrap()
        .catch((err) => {
          console.error('Failed to fetch user:', err);
          setError('Failed to load user data.');
        });
    }
  }, [dispatch, user.id]);

  // Fetch the book when the component is mounted or the ID changes
  useEffect(() => {
    if (!id) {
      setError('Book ID is missing');
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchBookById(id)
      .then((fetchedBook) => {
        setBook(fetchedBook);
      })
      .catch((err) => {
        console.error('Failed to fetch book:', err);
        setError('Failed to load book details.');
      })
      .finally(() => setLoading(false));
  }, [id]);
  if (error) {
    return <div className={classes.error}>{error}</div>;
  }

  if (loading) {
    return (
      <div className={classes.spiner}>
        <CircularProgress />
      </div>
    );
  }

  if (!book) {
    return <NotFound />;
  }

  return (
    <div className={classes.container}>
      <div className={classes.imageWrapper}>
        <img src={book.coverImage} alt={book.title} className={classes.image} />
      </div>
      <div className={classes.info}>
        <h1 className={classes.title}>{book.title}</h1>
        <p className={classes.author}>Author: {book.author}</p>
        <p className={classes.genre}>Genre: {book.genre}</p>
        <p className={classes.year}>
          Published Year: {new Date(book.publishedYear).getFullYear()}
        </p>
        <p className={classes.rating}>Rating: {book.rating}/5</p>
      </div>
      <AddToFavoritiesButton id={book.id} />
    </div>
  );
};

export default BookDetails;
