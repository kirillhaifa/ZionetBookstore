# Book Explorer

Zionet BookStore is a React-based application designed for exploring, filtering, and displaying books. It uses Redux for state management, TypeScript for type safety, and Webpack for bundling.

---

## Features

- **Search and Filter**: Search by title or author and filter by genre.
- **Dynamic Book List**: Displays a list of books with real-time updates.
- **Reusable Components**: Highly modular and reusable components for scalability.
- **TypeScript Support**: Provides type safety for enhanced code reliability.
- **Customizable Styles**: Uses SCSS for styling.

---

## Project Structure

The project is organized into the following structure:

```bash
public/
├── index.html          # Main HTML file
src/
├── assets/             # Static assets (images, icons, etc.)
├── Components/         # Reusable React components
├── pages/              # Page-level components
├── store/              # Redux slices and store configuration
├── Styles/             # Global and modular SCSS styles
├── utils/              # Utility functions (e.g., helper methods)
├── App.tsx             # Main App component
├── index.tsx           # Entry point for React rendering
├── types.ts            # TypeScript type definitions
.eslintrc.js            # ESLint configuration
.gitignore              # Files to ignore in version control
.prettierrc             # Prettier configuration
package.json            # Project dependencies and scripts
tsconfig.json           # TypeScript configuration
webpack.config.js       # Webpack bundler configuration

---

## Scripts
- npm start - Starts the development server.
-  npm run build - Builds the project for production.

---

## Technologies Used
- React: Library for building user interfaces.
- Redux Toolkit: Simplified state management.
- TypeScript: Type-safe JavaScript.
- SCSS: CSS preprocessor for modular styles.
- Material-UI: UI component library.
- Webpack: Module bundler.

---

## How It Works
- **Filtering**
- Search: Users can search for books by title or author. The query is managed via Redux.
- Genre Filter: Users can filter books by genre. Selected genres are also managed in Redux.
- **Components**
- BookList: A reusable component that displays a list of books.
- BookCard: A single book card component displaying book details like title, author, genre, and cover image.
