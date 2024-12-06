import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

const ProtectedRoute: React.FC = () => {
  const user = useSelector((state: RootState) => state.user); // Получаем пользователя из хранилища

  // Если `user.id` отсутствует, перенаправляем на страницу логина
  if (!user?.id) {
    return <Navigate to="/login" replace />;
  }

  // Если пользователь авторизован, рендерим дочерние компоненты
  return <Outlet />;
};

export default ProtectedRoute;
