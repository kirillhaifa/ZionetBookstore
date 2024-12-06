import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import BookList from '../../Components/BookList/BookList';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { RootState } from '../../store';
import Navigation from '../../Components/Navigation/Navigation';
import { Book } from '../../types';
let classes = require('./FavoritiesBooks.module.scss');

const FavoritiesBooks = () => {
  const books = useSelector((state: RootState) => state.books.books); // Все книги
  const user = useSelector((state: RootState) => state.user); // Данные пользователя

  // Since the infinite scroll function for the book list loads 
  // the same books repeatedly (the mock data contains only 30 books), 
  // it's necessary to filter the books to remove duplicates when 
  // displaying favorite books. For a real backend, using only the 
  // filter function would be sufficient.
  const favoritiesBooks: Book[] = Array.from(
    books
      .filter((book) => user.favorites.includes(book.id)) // Фильтруем книги по id
      .reduce((map, book) => map.set(book.id, book), new Map()) // Убираем дубликаты
      .values(), // Получаем уникальные книги
  );

  return favoritiesBooks.length !== 0 ? (
    <div className={classes.favorities__container}>
      <h2 className={classes.text}>Your favorite books</h2>
      <BookList books={favoritiesBooks} />
    </div>
  ) : (
    <h2 className={classes.text}>No favorite books yet</h2>
  );
};

export default FavoritiesBooks;
