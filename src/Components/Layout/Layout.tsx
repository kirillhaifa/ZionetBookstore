import React from 'react';
import Header from '../Header/Header';
import Navigation from '../Navigation/Navigation';
import Footer from '../Footer/Footer';

let classes = require('./Layout.module.scss');

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className={classes.container}>
      <div className={classes.container_upper}>
        <Header />
        <Navigation />
        <main className={classes.content}>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
