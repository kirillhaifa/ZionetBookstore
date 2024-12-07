import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store';
import { fetchUser } from '../../store/slices/userSlice';
import { CircularProgress } from '@mui/material';

//compomnent which checks user
//custon realiztion for mock user instead of real auth
const ProtectedRoute: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.user);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    //if no user in store we checks cokkie
    if (!user.id) {
      const isCookieAuthorized = document.cookie
        .split('; ')
        .some((cookie) => cookie === 'authorized=true');

      if (isCookieAuthorized) {
        //if there is a cokkie we fetch user
        setLoading(true);
        dispatch(fetchUser())
          .unwrap()
          .catch((err) => {
            console.error('Failed to fetch user:', err);
          })
          .finally(() => setLoading(false));
      }
    }
  }, [dispatch, user.id]);

  //spiner while loading
  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  //if no user in store and no cookie - navigate to login
  if (!user.id && !document.cookie.includes('authorized=true')) {
    return <Navigate to="/login" replace />;
  }

  // otherwise return child component
  return <Outlet />;
};

export default ProtectedRoute;
