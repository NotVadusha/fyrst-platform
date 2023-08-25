import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SuccessGoogleAuthPage = () => {
  useEffect(() => {
    const accessToken = Cookies.get('accessToken')
    const refreshToken = Cookies.get('refreshToken')

    localStorage.setItem('accessToken', accessToken!)
    localStorage.setItem('refreshToken', refreshToken!)
  }, [])
  
  return <Navigate to={'/'}/>
};

export default SuccessGoogleAuthPage;
