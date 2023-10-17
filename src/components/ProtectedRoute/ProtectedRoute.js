import React, { useContext } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import CurrentUserContext from '../../context/CurrentUserContext';

const ProtectedRoute = () => {
  const user = useContext(CurrentUserContext);
  return user.isLoggedIn ?  <Outlet/> : <Navigate to="/" replace/>
  }

export default ProtectedRoute;