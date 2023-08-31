import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useAppDispatch } from 'src/common/hooks/redux';
import { setUser } from 'src/common/store/slices/packages/user/userSlice';

const SuccessGoogleAuthPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const accessToken = Cookies.get('accessToken');
    const refreshToken = Cookies.get('refreshToken');
    const userInfoJson = Cookies.get('user');
    const userInfo = JSON.parse(userInfoJson || '');

    console.log(userInfo);

    dispatch(setUser(userInfo));

    localStorage.setItem('accessToken', accessToken!);
    localStorage.setItem('refreshToken', refreshToken!);
  }, []);

  return <Navigate to={'/'} />;
};

export default SuccessGoogleAuthPage;
