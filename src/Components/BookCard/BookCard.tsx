import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
let styles = require('./BookCard.module.scss')

const BookCard = ({ book }) => {
  return (
    <Card className={styles.card} tabIndex={0}>
      <CardMedia
        className={styles.media}
        component="img"
        image={book.coverImage}
        alt={book.title}
      />
      <CardContent className={styles.content}>
        <Typography gutterBottom variant="h5" component="div">
          {book.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Author: {book.author}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Genre: {book.genre}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Rating: {book.rating}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default BookCard;
