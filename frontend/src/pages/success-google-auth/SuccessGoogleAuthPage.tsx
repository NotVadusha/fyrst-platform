import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppDispatch } from 'src/hooks/redux';
import jwtDecode from 'jwt-decode';
import { JwtPayload } from 'types';
import { setUserId } from 'src/store/reducers/user.store';

const SuccessGoogleAuthPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');

    const payload = jwtDecode<JwtPayload>(accessToken!);

    dispatch(setUserId(payload.id));

    localStorage.setItem('accessToken', accessToken!);
    localStorage.setItem('refreshToken', refreshToken!);
  }, []);

  return <Navigate to={'/'} />;
};

export default SuccessGoogleAuthPage;
