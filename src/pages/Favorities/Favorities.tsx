import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BookList from '../../Components/BookList/BookList';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { RootState } from '../../store';
let classes = require('./Favorities.module.scss');

const Favorities = () => {
  const books = useSelector((state: RootState) => state.books.books); // Все книги
  const user = useSelector((state: RootState) => state.user); // Данные пользователя

  // Проверка: если пользователь не авторизован
  if (!user.id) {
    return (
      <div className={classes.container}>
        <Header />
        <div className={classes.no_user_container}>
            <h2>Please log in to manage your favorites</h2>
            <Link to="/login">Login</Link>
        </div>
        <Footer />
      </div>
    );
  }

  // Фильтруем избранные книги
  const favoritiesBooks = books.filter((book) =>
    user.favorites.includes(book.id),
  );

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.favorities__container}>
        <h2 className={classes.text}>Your favorite books</h2>
        <BookList books={favoritiesBooks} />
      </div>
      <Footer />
    </div>
  );
};

export default Favorities;
