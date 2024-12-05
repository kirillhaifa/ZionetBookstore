import BookDetails from '../../Components/BookDetails/BookDetails';
import Footer from '../../Components/Footer/Footer';
import Header from '../../Components/Header/Header';
import Navigation from '../../Components/Navigation/Navigation';
let classes = require('./BookDetails.module.scss')

const BookDetailsPage = () => {
  return (
    <div className={classes.container}>
      <Header />
      <Navigation />
      <BookDetails />
      <Footer />  
    </div>
  );
};

export default BookDetailsPage

