import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHomeOutline } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

let classes = require('./Navigation.module.scss') 

const NavigationBar = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.id);

  return (
    <nav className={classes.navigation_bar}>
      <button onClick={() => navigate('/')} className={classes.nav_button}>
        <IoHomeOutline />
        <h4>Home</h4>
      </button>
      <button onClick={() => navigate(user ? '/favorites' : '/login')}  className={classes.nav_button}>
        <FaRegHeart />
        <h4>Favorites</h4>
      </button>
    </nav>
  );
};

export default NavigationBar;
