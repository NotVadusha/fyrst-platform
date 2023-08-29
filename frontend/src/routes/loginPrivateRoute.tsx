import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { DecodedUser, User } from 'types/models/User';

export type ProtectedRouteProps = {
  children: JSX.Element;
};

export const LoginPrivateRoute = ({ children }: ProtectedRouteProps) => {
  const jwt = localStorage.getItem('accessToken');
  if (!jwt) return <Navigate to={'auth/signin'} replace />;
  const decoded: DecodedUser = jwtDecode(jwt);
  if (!decoded) return <Navigate to={'auth/signin'} replace />;
  return children;
};
