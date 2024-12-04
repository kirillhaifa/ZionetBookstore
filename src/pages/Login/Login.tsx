import BookList from '../../Components/BookList/BookList';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import LoginForm from '../../Components/Login/Login';
let classes = require('./Login.module.scss')

const Home = () => {
  return (
    <div className={classes.container}>
      <Header />
      <LoginForm />
      <Footer />
    </div>
  );
};

export default Home