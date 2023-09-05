import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { Navigate } from 'react-router-dom';
import { DecodedUser } from 'src/common/packages/user/types/models/User.model';
import { useLazyGetUserQuery } from 'src/common/store/api/packages/user/userApi';
import { useAppDispatch } from 'src/common/hooks/redux';
import { setUser } from 'src/common/store/slices/packages/user/userSlice';

export type ProtectedRouteProps = {
  children: JSX.Element;
};

export const ConfigurateProtectedRoute = ({ children }: ProtectedRouteProps) => {
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
          }),
        ),
      )
      .catch(() => navigate('auth/signin'));
  }, []);

  return children;
};
