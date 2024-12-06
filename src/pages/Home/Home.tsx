import { useSelector } from 'react-redux';
import BookList from '../../Components/BookList/BookList';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { RootState } from '../../store';
import Navigation from '../../Components/Navigation/Navigation';
import GenreFilter from '../../Components/GenreSelect/GenreSelect';
import SearchInput from '../../Components/SearchInput/SearchInput';
import { CircularProgress } from '@mui/material';
import { Book } from '../../types';

let classes = require('./Home.module.scss');

const Home = () => {
  const books = useSelector((state: RootState) => state.books.books); // Все книги
  const booksLoading = useSelector((state: RootState) => state.books.loading); // Индикатор загрузки
  const query = useSelector((state: RootState) => state.filter.query); // Строка поиска
  const genre = useSelector((state: RootState) => state.filter.genre); // Выбранный жанр

  // Логика фильтрации книг
  const filteredBooks: Book[] = books.filter((book: Book) => {
    const matchesQuery =
      query === '' ||
      book.title.toLowerCase().includes(query.toLowerCase()) ||
      book.author.toLowerCase().includes(query.toLowerCase());
    const matchesGenre = genre === 'All' || book.genre === genre;
    return matchesQuery && matchesGenre;
  });

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Header />
        <Navigation />
        <div className={classes.filter_container}>
          <SearchInput /> {/* Управляет строкой поиска */}
          <GenreFilter /> {/* Управляет выбранным жанром */}
        </div>
        {booksLoading ? (
          <div className={classes.loading}>
            <CircularProgress />
          </div>
        ) : (
          <BookList books={filteredBooks} /> // Передаем отфильтрованные книги
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Home;
