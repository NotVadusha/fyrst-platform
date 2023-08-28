import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppDispatch } from 'src/hooks/redux';
import jwtDecode from 'jwt-decode';
import { setUser } from 'src/store/reducers/user.store';

const SuccessGoogleAuthPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    const userInfoJson = Cookies.get('user');
    const userInfo = JSON.parse(userInfoJson || '');

    dispatch(setUser(userInfo));

    localStorage.setItem('accessToken', accessToken!);
    localStorage.setItem('refreshToken', refreshToken!);
  }, []);

  return <Navigate to={'/'} />;
};

export default SuccessGoogleAuthPage;
