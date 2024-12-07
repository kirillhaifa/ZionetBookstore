import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { RootState } from '../../store';
import { logoutUser } from '../../store/slices/userSlice';
import { GoBook } from 'react-icons/go';
import { FaRegUser } from 'react-icons/fa6';
import { MdOutlineLogout } from 'react-icons/md';
import { MdOutlineLogin } from 'react-icons/md';
let classes = require('./Header.module.scss');

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user);

  //clean store and cookie in case of logout, navigate to home page
  //instead of auth
  const handleLogout = () => {
    dispatch(logoutUser());
    document.cookie = "authorized=; path=/; max-age=0";
    navigate('/');
  };


  return (
    <header className={classes.header}>
      <Link to="/" className={classes.logo}>
        <GoBook className={classes.logo__icon} />
        <h1 className={classes.logo__text}>Zionet BookStore</h1>
      </Link>
      <div className={classes.actions}>
        {user.id ? (
          <div className={classes.user}>
            <button className={classes.profile}>
              <div className={classes.icon}>
                <FaRegUser className={classes.avatar} />
              </div>
              <span className={classes.username}>{user.name}</span>
            </ button>
            <button className={classes.logout} onClick={handleLogout}>
              <MdOutlineLogout />
              <p className={classes.logout__text}>Logout</p>
            </button>
          </div>
        ) : (
          // if no user in store - login button
          location.pathname !== '/login' && (
            <button
              className={classes.login}
              onClick={() => navigate('/login')}
            >
              <MdOutlineLogin />
              <p className={classes.login__text}>Login</p>
            </button>
          )
        )}
      </div>
    </header>
  );
};

export default Header;
