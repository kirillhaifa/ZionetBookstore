import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { RootState } from '../../store';
import { logoutUser } from '../../store/slices/userSlice';
import { GoBook } from 'react-icons/go';
import { FaRegUser } from 'react-icons/fa6';
import { MdFavoriteBorder } from 'react-icons/md';
import { MdOutlineLogout } from 'react-icons/md';

import '../../assets/Fonts/fonts.scss'; //module overtake global styles
let classes = require('./Header.module.scss'); // Импорт модульных стилей

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <GoBook className={classes.logo__icon} />
        <Link to="/"><h1 className={classes.logo__text}>Zionet BookStore</h1></Link>
      </div>
      <div className={classes.actions}>
        {user ? (
          <div className={classes.user}>
            <div className={classes.profile}>
              <div className={classes.icon}>
                <FaRegUser className={classes.avatar} />
              </div>
              <span className={classes.username}>{user.name}</span>
            </div>
            <button className={classes.logout} onClick={handleLogout}>
              <MdOutlineLogout />
              <p className={classes.logout__text}>Logout</p>
            </button>
            <Link to="/favorites" className={classes.favorites}>
              <MdFavoriteBorder />
              <p className={classes.favorites__text}>Favorites</p>
            </Link>
          </div>
        ) : (
          <button className={classes.login} onClick={() => navigate('/login')}>
            <p className={classes.login__text}>Login</p>
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
