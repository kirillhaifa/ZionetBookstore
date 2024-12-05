import BookList from '../../Components/BookList/BookList';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import LoginForm from '../../Components/Login/Login';
import Navigation from '../../Components/Navigation/Navigation';
let classes = require('./Login.module.scss');

const LoginPage = () => {
  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <Header />
        <Navigation />
        <LoginForm />
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
