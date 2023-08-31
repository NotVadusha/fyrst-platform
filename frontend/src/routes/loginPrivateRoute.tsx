import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { DecodedUser, User } from 'types/models/User';
import { useLazyGetUserQuery } from 'src/store/reducers/user/userApi';
import { useAppDispatch } from 'src/hooks/redux';
import { setUser } from 'src/store/reducers/user.store';

export type ProtectedRouteProps = {
  children: JSX.Element;
};

export const LoginPrivateRoute = ({ children }: ProtectedRouteProps) => {
  const [getUser] = useLazyGetUserQuery();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const jwt = localStorage.getItem('accessToken');
  if (!jwt) return <Navigate to={'auth/signin'} replace />;

  const decoded: DecodedUser = jwtDecode(jwt);
  if (!decoded) return <Navigate to={'auth/signin'} replace />;

  useEffect(() => {
    getUser(decoded.id)
      .unwrap()
      .then(result =>
        dispatch(
          setUser({
            ...result,
            birthdate: result.birthdate ? new Date(result.birthdate) : undefined,
          }),
        ),
      )
      .catch(() => navigate('auth/signin'));
  }, []);

  return children;
};
