import { useSelector } from 'react-redux';
import BookList from '../../Components/BookList/BookList';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { RootState } from '../../store';
import Navigation from '../../Components/Navigation/Navigation';
import GenreFilter from '../../Components/GenreSelect/GenreSelect';
import SearchInput from '../../Components/SearchInput/SearchInput';

let classes =require('./Home.module.scss')

const Home = () => {
  const books = useSelector((state: RootState) => state.books.books);

  return (
    <div className={classes.container}>
      <div className={classes.content}>
      <Header />
      <Navigation />
      <div className={classes.filter_container}>
        <SearchInput />
        <GenreFilter />
      </div>
      <BookList books={books} />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
