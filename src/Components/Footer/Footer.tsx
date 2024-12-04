import React from 'react';
import '../../assets/Fonts/fonts.scss'; 
let classes = require('./Footer.module.scss'); 
const Footer: React.FC = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.left}>
        <p>Zionet BookStore &copy; Since 2024</p>
      </div>
      <div className={classes.right}>
        <p>Developed by Kirill Smushkin</p>
      </div>
    </footer>
  );
};

export default Footer;
