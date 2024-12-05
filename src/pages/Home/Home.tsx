import { useSelector } from 'react-redux';
import BookList from '../../Components/BookList/BookList';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { RootState } from '../../store';
import Navigation from '../../Components/Navigation/Navigation';

const Home = () => {
  const books = useSelector((state: RootState) => state.books.books);
  
  return (
    <>
      <Header />
      <Navigation />
      <BookList books={books}/>
      <Footer />
    </>
  );
};

export default Home