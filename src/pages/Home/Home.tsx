import { useSelector } from 'react-redux';
import BookList from '../../Components/BookList/BookList';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import { RootState } from '../../store';

const Home = () => {
  const books = useSelector((state: RootState) => state.books.books);
  
  return (
    <>
      <Header />
      <BookList books={books}/>
      <Footer />
    </>
  );
};

export default Home