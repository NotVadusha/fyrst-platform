import jwtDecode from 'jwt-decode';
import React, { useEffect } from 'react';
import { JWTPayload } from 'shared/packages/authentication/types/JWTPayload';
import { TokenResponseDto } from 'src/common/packages/authentication/login/types/dto/TokenResponseDto';

interface AuthWrapperProps {
  children: React.ReactNode;
  image: string;
  text?: string;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, image, text }) => {
  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) return;

    let payload: JWTPayload;

    try {
      payload = jwtDecode<JWTPayload>(accessToken ?? '');
    } catch (err) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      return;
    }

    const refreshUserTokens = async () => {
      const refreshResult = await (
        await fetch(`${process.env.REACT_APP_API_URL!}/auth/refresh`, {
          body: JSON.stringify({
            refresh_token: localStorage.getItem('refreshToken'),
            id: payload.id,
          }),
          method: 'POST',
          headers: {
            authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        })
      ).json();

      if (refreshResult?.error) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      } else {
        const tokens = refreshResult as TokenResponseDto;

        if (tokens) {
          localStorage.setItem('accessToken', tokens?.accessToken);
          localStorage.setItem('refreshToken', tokens?.refreshToken);

          window.location.href = '/';
        }
      }
    };

    refreshUserTokens();
  }, []);

  return (
    <div className='h-screen w-screen flex flex-row'>
      <section className='flex items-center justify-center w-full md:w-1/2 bg-white'>
        {children}
      </section>
      <section className='items-center justify-center w-1/2 bg-blue hidden md:flex'>
        <div className='flex flex-col gap-10 w-3/4'>
          <img className='w-full' src={image} alt='auth image' />
          {text ? (
            <h3 className='text-3xl leading-[2.8125rem] text-white text-center'>{text}</h3>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default AuthWrapper;
