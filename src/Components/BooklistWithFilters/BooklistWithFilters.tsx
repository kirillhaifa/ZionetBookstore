import { Grid2 } from "@mui/material";
import GenreFilter from "../GenreSelect/GenreSelect";
import SearchInput from "../SearchInput/SearchInput";
import BookCard from "../BookCard/BookCard";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { Book } from "../../types";

let classes = require('./BooklistWithFilters.module.scss')

const BooklistWithFilters = () => { 
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
      <div className={classes.filter_container}>
        <SearchInput /> {/* Управляет строкой поиска */}
        <GenreFilter /> {/* Управляет выбранным жанром */}
      </div>
      <div className={classes.container_booklist}>
        <Grid2 container spacing={1} justifyContent="center" margin="auto">
          {filteredBooks.map((book) => (
            <BookCard book={book} key={book.id} />
          ))}
        </Grid2>
      </div>
    </div>
  );
}

export default BooklistWithFilters